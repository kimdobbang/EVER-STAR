package com.everstarbackauth.global.security.oauth;

import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class OAuthAttributeService {

	public String getRegistrationId(OAuth2UserRequest userRequest) {
		return userRequest.getClientRegistration().getRegistrationId();
	}

	public OAuthAttribute getOauthAttribute(OAuth2User oAuth2User, String registrationId) {
		return OAuthAttribute.createOauthAttribute(oAuth2User.getAttributes(), registrationId);
	}
}
