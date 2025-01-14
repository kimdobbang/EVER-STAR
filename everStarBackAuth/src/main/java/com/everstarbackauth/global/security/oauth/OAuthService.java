package com.everstarbackauth.global.security.oauth;

import java.lang.reflect.Member;
import java.time.LocalDate;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.everstarbackauth.domain.user.model.Role;
import com.everstarbackauth.domain.user.model.User;
import com.everstarbackauth.domain.user.repository.UserRepository;
import com.everstarbackauth.global.exception.CustomException;
import com.everstarbackauth.global.exception.ExceptionResponse;
import com.everstarbackauth.global.security.auth.PrincipalDetails;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j(topic = "elk")
public class OAuthService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

	private final UserRepository userRepository;
	private final DefaultOAuth2UserService delegate;
	private final OAuthAttributeService oauthAttributeService;
	private final PasswordEncoder passwordEncoder;

	@Override
	@Transactional
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		OAuth2User oAuth2User = delegate.loadUser(userRequest);
		String id = oauthAttributeService.getRegistrationId(userRequest);
		OAuthAttribute oauthAttribute = oauthAttributeService.getOauthAttribute(oAuth2User, id);

		User user =
			!userRepository.existsByEmailAndIsDeleted(oauthAttribute.getEmail(), false) ?
				oAuthSignUpUser(oauthAttribute) :
				findUser(oauthAttribute);

		return new PrincipalDetails(user, oAuth2User.getAttributes());
	}

	private User oAuthSignUpUser(OAuthAttribute oauthAttribute) {
		if (userRepository.existsByEmailAndIsDeleted(oauthAttribute.getEmail(), true))
			throw new OAuth2AuthenticationException(
				CustomException.EXIST_EMAIL.getErrorCode());

		User user = User.oAuthSignUpUser(oauthAttribute.getEmail(),
			passwordEncoder.encode(oauthAttribute.getEmail() + LocalDate.now()));

		userRepository.save(user);
		return user;
	}

	private User findUser(OAuthAttribute oauthAttribute) {
		return userRepository.findUserByEmailAndIsDeleted(oauthAttribute.getEmail(), false)
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_EXIST_EMAIL));
	}
}
