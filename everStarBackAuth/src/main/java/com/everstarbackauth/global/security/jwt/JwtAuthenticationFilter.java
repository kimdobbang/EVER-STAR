package com.everstarbackauth.global.security.jwt;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.everstarbackauth.domain.user.model.User;
import com.everstarbackauth.global.exception.CustomException;
import com.everstarbackauth.global.exception.ExceptionResponse;
import com.everstarbackauth.global.security.auth.PrincipalDetails;
import com.everstarbackauth.global.util.HttpResponseUtil;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

	private final JwtUtil jwtUtil;
	private final ObjectMapper objectMapper;
	private final HttpResponseUtil responseUtil;

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws
		AuthenticationException {
		try {
			User user = objectMapper.readValue(request.getInputStream(), User.class);
			UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
				user.getEmail(), user.getPassword());
			return getAuthenticationManager().authenticate(authenticationToken);
		} catch (IOException e) {
			throw new ExceptionResponse(CustomException.ID_PASSWORD_INPUT_EXCEPTION);
		}
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
		Authentication authentication) throws IOException {
		User user = ((PrincipalDetails)authentication.getPrincipal()).getUser();
		String accessToken = jwtUtil.getAccessToken(user);
		log.info("accessToken: {}", accessToken);

		response.addHeader("Authorization", "Bearer " + accessToken);
		response.setContentType("application/json;charset=UTF-8");
		response.getWriter().write("Login Success");
	}

	@Override
	protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
		AuthenticationException failed) throws IOException {
		response.getWriter().write("Login Fail");
		response.setStatus(401);
	}
}
