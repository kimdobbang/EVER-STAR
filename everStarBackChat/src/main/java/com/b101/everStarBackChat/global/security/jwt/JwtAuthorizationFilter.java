package com.b101.everStarBackChat.global.security.jwt;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.b101.everStarBackChat.domain.user.model.User;
import com.b101.everStarBackChat.domain.user.repository.UserRepository;
import com.b101.everStarBackChat.global.exception.CustomException;
import com.b101.everStarBackChat.global.exception.ExceptionResponse;
import com.b101.everStarBackChat.global.security.auth.PrincipalDetails;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Slf4j(topic = "elk")
public class JwtAuthorizationFilter extends OncePerRequestFilter {

	private final JwtUtil jwtUtil;
	private final UserRepository userRepository;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
		FilterChain filterChain) throws ServletException, IOException {
		String servletPath = request.getServletPath();
		if (!servletPath.equals("/ws-stomp/websocket") && !servletPath.equals("/api/chat/room")
			&& !servletPath.equals("/chat/room")) {
			String accessToken = extractAccessToken(request);
			if(accessToken != null) {
				String userEmail = extractUserEmail(accessToken);
				User user = userRepository.findUserByEmailAndIsDeleted(userEmail, false).orElseThrow(() ->
					new ExceptionResponse(CustomException.NOT_FOUND_USER_EXCEPTION)
				);

				generateAuthentication(user);
				log.info("Authentication set for user: {}", userEmail);
			}

		}
		filterChain.doFilter(request, response);
	}

	private String extractAccessToken(HttpServletRequest request) {
		String bearerToken = request.getHeader("Authorization");
		log.info("mainServer bearerToken : {}", bearerToken);

		if (!StringUtils.hasText(bearerToken) || !bearerToken.startsWith("Bearer ")) {
			log.error("mainServer error: {}", CustomException.ACCESS_DENIED_EXCEPTION);
			return null;
		}

		return bearerToken.substring(7);
	}

	private String extractUserEmail(String accessToken) {
		if (!jwtUtil.isExpired(accessToken)) {
			log.error("mainServer notValidToken: {}", CustomException.NOT_VALID_JWT_EXCEPTION);
			throw new ExceptionResponse(CustomException.NOT_VALID_JWT_EXCEPTION);
		}

		return jwtUtil.getUserEmail(accessToken);
	}

	private void generateAuthentication(User user) {
		PrincipalDetails userPrincipalDetails = new PrincipalDetails(user);
		Authentication authentication = new UsernamePasswordAuthenticationToken(userPrincipalDetails,
			null,
			userPrincipalDetails.getAuthorities());
		SecurityContextHolder.getContext().setAuthentication(authentication);
	}
}
