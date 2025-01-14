package com.everstarbackauth.global.security.oauth;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import com.everstarbackauth.domain.user.model.Role;
import com.everstarbackauth.domain.user.model.User;
import com.everstarbackauth.global.security.auth.PrincipalDetails;
import com.everstarbackauth.global.security.jwt.JwtUtil;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j(topic = "elk")
public class OAuthSuccessHandler implements AuthenticationSuccessHandler {
	private final JwtUtil jwtUtil;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws IOException, ServletException {
		User user = ((PrincipalDetails)authentication.getPrincipal()).getUser();

		if (user.getRole().equals(Role.ROLE_GUEST)) {
			response.sendRedirect(sendNotAuthenticatedAuthUrl(user));
			return;
		}

		if (user.getRole().equals(Role.ROLE_USER)) {
			response.sendRedirect(sendVerifiedAuthUrl(user));
		}
	}

	private String sendNotAuthenticatedAuthUrl(User user) {
		log.info("auth server: notAuthenticated");
		return UriComponentsBuilder.fromUriString("https://i11b101.p.ssafy.io/signup/" + user.getEmail())
			.build()
			.toString();
	}

	private String sendVerifiedAuthUrl(User user) {
		String token = jwtUtil.getAccessToken(user);
		log.info("auth server - accessToken : {}", token);
		return UriComponentsBuilder.fromUriString("https://i11b101.p.ssafy.io/oauth/" + token)
			.build()
			.toString();
	}
}
