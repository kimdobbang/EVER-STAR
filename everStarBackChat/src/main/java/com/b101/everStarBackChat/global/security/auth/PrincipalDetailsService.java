package com.b101.everStarBackChat.global.security.auth;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.b101.everStarBackChat.domain.user.model.User;
import com.b101.everStarBackChat.domain.user.repository.UserRepository;
import com.b101.everStarBackChat.global.exception.CustomException;
import com.b101.everStarBackChat.global.exception.ExceptionResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PrincipalDetailsService implements UserDetailsService {

	private final UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user = userRepository.findUserByEmail(email).orElseThrow(() ->
			new ExceptionResponse(CustomException.NOT_FOUND_USER_EXCEPTION)
		);
		return new PrincipalDetails(user);
	}
}
