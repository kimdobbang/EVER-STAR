package com.everstarbackauth.global.security.oauth;

import java.util.Map;

import com.everstarbackauth.global.exception.CustomException;
import com.everstarbackauth.global.exception.ExceptionResponse;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Getter
@Slf4j
public class OAuthAttribute {

	private String email;
	private String name;
	private Map<String, Object> attributes;

	private OAuthAttribute(String email, String name, Map<String, Object> attributes) {
		this.email = email;
		this.name = name;
		this.attributes = attributes;
	}

	public static OAuthAttribute createOauthAttribute(Map<String, Object> attributes, String registrationId) {
		if (registrationId.equals("kakao"))
			return makeKakao(attributes);
		if (registrationId.equals("google"))
			return makeGoogle(attributes);

		throw new ExceptionResponse(CustomException.NOT_EXIST_REGISTRATIONID);
	}

	private static OAuthAttribute makeKakao(Map<String, Object> attributes) {
		Map<String, Object> kakaoAccount = (Map<String, Object>)attributes.get("kakao_account");
		Map<String, Object> profile = (Map<String, Object>)kakaoAccount.get("profile");

		log.info((String)kakaoAccount.get("email"));
		log.info((String)profile.get("nickname"));

		return new OAuthAttribute((String)kakaoAccount.get("email"), (String)profile.get("nickname"), kakaoAccount);
	}

	private static OAuthAttribute makeGoogle(Map<String, Object> attributes) {
		String email = (String)attributes.get(("email"));
		String name = (String)attributes.get(("name"));
		return new OAuthAttribute(email, name, attributes);
	}
}