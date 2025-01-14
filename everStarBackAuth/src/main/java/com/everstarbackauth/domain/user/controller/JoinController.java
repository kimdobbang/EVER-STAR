package com.everstarbackauth.domain.user.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.everstarbackauth.domain.user.requestDto.AuthenticateUserRequestDto;
import com.everstarbackauth.domain.user.requestDto.JoinRequestDto;
import com.everstarbackauth.domain.user.responseDto.JoinResponseMessage;
import com.everstarbackauth.domain.user.service.JoinService;
import com.everstarbackauth.global.util.HttpResponseUtil;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
@Slf4j(topic = "elk")
public class JoinController {

	private final JoinService joinService;
	private final HttpResponseUtil responseUtil;

	@PostMapping("/join")
	public ResponseEntity<?> signup(@RequestBody @Valid JoinRequestDto requestDto) {
		joinService.signup(requestDto);
		ResponseEntity<Map<String, Object>> response = responseUtil.createResponse(JoinResponseMessage.SUCCESS_SIGNUP);

		return response;
	}

	@PutMapping("/oauth/join")
	public ResponseEntity<?> authUser(@RequestBody @Valid AuthenticateUserRequestDto requestDto,
		HttpServletResponse servletResponse) {
		joinService.authenticateUser(requestDto, servletResponse);
		ResponseEntity<Map<String, Object>> response = responseUtil.createResponse(JoinResponseMessage.SUCCESS_SIGNUP);

		log.info("auth server - request {}", requestDto);
		log.info("auth server - response {}", response);
		return response;
	}
}
