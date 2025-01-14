package com.everstarbackmain.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.everstarbackmain.domain.user.repository.UserRepository;
import com.everstarbackmain.global.security.exceptionHandler.CustomExceptionHandler;
import com.everstarbackmain.global.security.jwt.JwtAuthorizationFilter;
import com.everstarbackmain.global.security.jwt.JwtUtil;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

	private final JwtUtil jwtUtil;
	private final CustomExceptionHandler customExceptionHandler;
	private final UserRepository userRepository;

	@Bean
	public JwtAuthorizationFilter jwtAuthorizationFilter() throws Exception {
		JwtAuthorizationFilter filter = new JwtAuthorizationFilter(jwtUtil, userRepository);
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
			.requestMatchers("/api/pets/**").hasRole("USER")
			.requestMatchers("/api/accounts/users/**").hasRole("USER")
			.requestMatchers("/api/everstar/**").hasRole("USER")
			.requestMatchers("/api/earth/connect/**").permitAll()
			.requestMatchers("/api/notifications/**").hasRole("USER")
			.requestMatchers("api/sessions/**").permitAll()
			.anyRequest().authenticated()
		);
		http.exceptionHandling((handle) -> handle.authenticationEntryPoint(customExceptionHandler));
		http.addFilterBefore(jwtAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}
}
