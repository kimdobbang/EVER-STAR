package com.everstarbackauth.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.everstarbackauth.global.security.jwt.JwtAuthenticationFilter;
import com.everstarbackauth.global.security.jwt.JwtUtil;
import com.everstarbackauth.global.security.oauth.OAuthFailHandler;
import com.everstarbackauth.global.security.oauth.OAuthService;
import com.everstarbackauth.global.security.oauth.OAuthSuccessHandler;
import com.everstarbackauth.global.security.securityExceptionHandler.CustomExceptionHandler;
import com.everstarbackauth.global.util.HttpResponseUtil;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

	private final AuthenticationConfiguration authenticationConfiguration;
	private final JwtUtil jwtUtil;
	private final ObjectMapper objectMapper;
	private final CustomExceptionHandler customExceptionHandler;
	private final HttpResponseUtil responseUtil;
	private final OAuthService oauthService;
	private final OAuthSuccessHandler oAuthSuccessHandler;
	private final OAuthFailHandler oAuthFailHandler;

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
		return configuration.getAuthenticationManager();
	}

	@Bean
	public JwtAuthenticationFilter jwtAuthenticationFilter() throws Exception {
		JwtAuthenticationFilter filter = new JwtAuthenticationFilter(jwtUtil, objectMapper, responseUtil);
		filter.setFilterProcessesUrl("/api/auth/login");
		filter.setAuthenticationManager(authenticationManager(authenticationConfiguration));
		return filter;
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.csrf((auth) -> auth.disable());
		http.formLogin((auth) -> auth.disable());
		http.httpBasic((auth) -> auth.disable());
		http.sessionManagement((session) -> session
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
		);
		http.authorizeHttpRequests((auth) -> auth
			.requestMatchers("/api/auth/**").permitAll()
			.anyRequest().authenticated()
		);
		http.oauth2Login((oauth) ->
			oauth.userInfoEndpoint(c -> c.userService(oauthService))
				.successHandler(oAuthSuccessHandler)
				.failureHandler(oAuthFailHandler)
				.redirectionEndpoint(
					(redirectionEndpointConfig) -> redirectionEndpointConfig.baseUri(("/api/auth/login/oauth2/code/*")))
				.authorizationEndpoint((authorizationEndpointConfig) ->
					authorizationEndpointConfig.baseUri("/api/auth/oauth2/authorization"))
		);
		http.exceptionHandling((handle) -> handle.authenticationEntryPoint(customExceptionHandler));
		http.addFilterAt(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}
}
