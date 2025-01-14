package com.everstarbackmain.domain.user.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.everstarbackmain.domain.user.responseDto.UserDetailResponseDto;
import com.everstarbackmain.domain.user.service.UserService;
import com.everstarbackmain.global.util.HttpResponseUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/accounts/users")
@Slf4j(topic = "elk")
public class UserController {

	private final UserService userService;
	private final HttpResponseUtil responseUtil;

	@GetMapping
	public ResponseEntity<Map<String, Object>> getUserDetails(Authentication authentication) {
		UserDetailResponseDto responseDto = userService.getUserDetail(authentication);

		ResponseEntity<Map<String, Object>> response = responseUtil.createResponse(responseDto);
		log.info("main server - response : {}", response);
		return response;
	}

}
