package com.everstarbackmain.domain.cheeringMessage.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.everstarbackmain.domain.cheeringMessage.message.SuccessCheeringMessageMessage;
import com.everstarbackmain.domain.cheeringMessage.requestDto.CreateCheeringMessageRequestDto;
import com.everstarbackmain.domain.cheeringMessage.responseDto.CheeringMessageDetailResponseDto;
import com.everstarbackmain.domain.cheeringMessage.service.CheeringMessageService;
import com.everstarbackmain.global.util.HttpResponseUtil;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/pets/{pet-id}/find/{find_pet-id}/cheeringMessages")
@Slf4j(topic = "elk")
public class CheeringMessageController {

	private final CheeringMessageService cheeringMessageService;
	private final HttpResponseUtil responseUtil;

	@PostMapping
	public ResponseEntity<Map<String, Object>> creatCheeringMessage(Authentication authentication,
		@PathVariable("pet-id") Long petId, @PathVariable("find_pet-id") Long findPetId,
		@Valid @RequestBody CreateCheeringMessageRequestDto requestDto) {
		CheeringMessageDetailResponseDto responseDto = cheeringMessageService.createCheeringMessage(authentication, petId, findPetId, requestDto);
		ResponseEntity<Map<String, Object>> response = responseUtil.createResponse(
			responseDto);

		log.info("main server - request : {}", requestDto);
		log.info("main server - response : {}", response);

		return response;
	}
}
