package com.everstarbackmain.global.security.jwt;

import java.util.Date;

import org.springframework.stereotype.Component;

import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.global.config.JwtValueConfig;

import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtUtil {

	private final JwtValueConfig config;

	public String getUserEmail(String token) {
		return Jwts.parser()
			.verifyWith(config.getKey())
			.build()
			.parseSignedClaims(token)
			.getPayload()
			.get("userEmail", String.class);
	}

	public Boolean isExpired(String token) {
		return !Jwts.parser()
			.verifyWith(config.getKey())
			.build()
			.parseSignedClaims(token)
			.getPayload()
			.getExpiration()
			.before(new Date());
	}
}
