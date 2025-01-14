package com.everstarbackmain.domain.user.service;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.domain.user.responseDto.UserDetailResponseDto;
import com.everstarbackmain.global.security.auth.PrincipalDetails;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class UserService {

	public UserDetailResponseDto getUserDetail(Authentication authentication) {
		User user = ((PrincipalDetails)authentication.getPrincipal()).getUser();

		UserDetailResponseDto responseDto = UserDetailResponseDto.createUserDetailResponseDto(user);
		return responseDto;
	}
}
