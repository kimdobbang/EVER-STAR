package com.everstarbackmain.domain.userLetter.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.everstarbackmain.domain.userLetter.message.SuccessUserLetterMessage;
import com.everstarbackmain.domain.userLetter.requestDto.WriteLetterRequestDto;
import com.everstarbackmain.domain.userLetter.service.UserLetterService;
import com.everstarbackmain.global.util.HttpResponseUtil;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/pets/{pet-id}/letters")
@Slf4j(topic = "elk")
public class UserLetterController {

	private final UserLetterService userLetterService;
	private final HttpResponseUtil responseUtil;

	@PostMapping
	public ResponseEntity<Map<String, Object>> writeLetter(Authentication authentication,
		@PathVariable("pet-id") long petId, @RequestPart("requestDto") @Valid WriteLetterRequestDto requestDto,
		@RequestPart("image") MultipartFile image) {
		userLetterService.writeLetter(authentication, petId, requestDto, image);
		ResponseEntity<Map<String, Object>> response = responseUtil.createResponse(
			SuccessUserLetterMessage.SUCCESS_WRITE_LETTER);

		log.info("main server - request :  requestDto {}", requestDto);
		log.info("main server - response : {}", response);

		return response;
	}

	@PostMapping("/{letter-id}")
	public ResponseEntity<Map<String, Object>> writeLetterAnswer(Authentication authentication,
		@PathVariable("pet-id") Long petId, @PathVariable("letter-id") Long letterId,
		@RequestPart("requestDto") @Valid WriteLetterRequestDto requestDto, @RequestPart("image") MultipartFile image) {
		userLetterService.writeLetterAnswer(authentication, petId, letterId, requestDto, image);
		ResponseEntity<Map<String, Object>> response = responseUtil.createResponse(
			SuccessUserLetterMessage.SUCCESS_WRITE_LETTER_ANSWER);

		log.info("main server - request :  requestDto {}", requestDto);
		log.info("main server - response : {}", response);

		return response;
	}
}
