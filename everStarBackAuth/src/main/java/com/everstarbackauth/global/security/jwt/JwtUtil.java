package com.everstarbackauth.global.security.jwt;

import java.util.Date;

import org.springframework.stereotype.Component;

import com.everstarbackauth.domain.user.model.User;
import com.everstarbackauth.global.config.JwtValueConfig;

import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtUtil {

	private final JwtValueConfig config;

	public String getAccessToken(User user) {
		return Jwts.builder()
			.claim("userEmail", user.getEmail())
			.issuedAt(new Date(System.currentTimeMillis()))
			.expiration(tokenExpiresIn(Long.parseLong(config.getAccessTokenExpire())))
			.signWith(config.getKey())
			.compact();
	}

	private Date tokenExpiresIn(long expires) {
		long now = (new Date()).getTime();
		Date dateExpiresIn = new Date(now + expires);
		return dateExpiresIn;
	}
}
