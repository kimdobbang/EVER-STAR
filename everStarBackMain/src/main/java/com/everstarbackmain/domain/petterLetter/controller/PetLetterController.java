package com.everstarbackmain.domain.petterLetter.controller;

import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.everstarbackmain.domain.petterLetter.responsedto.PetLetterResponseDto;
import com.everstarbackmain.domain.petterLetter.responsedto.getLetterResponseDto.GetLetterResponseDto;
import com.everstarbackmain.domain.petterLetter.service.PetLetterService;
import com.everstarbackmain.global.util.HttpResponseUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/pets/{pet-id}/letters")
@Slf4j(topic = "elk")
public class PetLetterController {

	private final PetLetterService petLetterService;
	private final HttpResponseUtil responseUtil;

	@GetMapping
	public ResponseEntity<Map<String, Object>> getPetLetters(Authentication authentication,
		@PathVariable("pet-id") Long petId, Pageable pageable) {

		Page<PetLetterResponseDto> responseDto = petLetterService.getPetLetters(authentication, petId, pageable);
		ResponseEntity<Map<String, Object>> response = responseUtil.createResponse(responseDto);

		log.info("main server - response : {}", response);

		return response;
	}

	@GetMapping("/{letter-id}")
	public ResponseEntity<Map<String, Object>> getLetter(Authentication authentication,
		@PathVariable("pet-id") Long petId, @PathVariable("letter-id") Long letterId) {

		GetLetterResponseDto responseDto = petLetterService.getLetter(authentication, petId, letterId);
		ResponseEntity<Map<String, Object>> response = responseUtil.createResponse(responseDto);

		log.info("main server - response : {}", response);

		return response;
	}
}
