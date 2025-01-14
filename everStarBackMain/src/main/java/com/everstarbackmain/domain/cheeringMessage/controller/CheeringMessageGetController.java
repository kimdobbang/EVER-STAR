package com.everstarbackmain.domain.cheeringMessage.controller;

import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.everstarbackmain.domain.cheeringMessage.responseDto.CheeringMessageDetailResponseDto;
import com.everstarbackmain.domain.cheeringMessage.responseDto.CheeringMessageResponseDto;
import com.everstarbackmain.domain.cheeringMessage.service.CheeringMessageService;
import com.everstarbackmain.global.util.HttpResponseUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/pets/{pet-id}/cheeringMessages")
@Slf4j(topic = "elk")
public class CheeringMessageGetController {

	private final CheeringMessageService cheeringMessageService;
	private final HttpResponseUtil responseUtil;

	@GetMapping
	ResponseEntity<Map<String, Object>> getCheeringMessages(@PathVariable("pet-id") Long petId, Pageable pageable) {
		Page<CheeringMessageResponseDto> responseDto = cheeringMessageService.getCheeringMessages(petId, pageable);
		ResponseEntity<Map<String, Object>> response = responseUtil.createResponse(responseDto);

		log.info("main server - response : {}", response);

		return response;
	}

	@GetMapping("/{cheeringMessage-id}")
	ResponseEntity<Map<String, Object>> getCheeringMessagesDetail(@PathVariable("pet-id") Long petId,
		@PathVariable("cheeringMessage-id") Long cheeringMessageId) {
		CheeringMessageDetailResponseDto responseDto = cheeringMessageService.getCheeringMessageDetail(petId, cheeringMessageId);
		ResponseEntity<Map<String, Object>> response = responseUtil.createResponse(responseDto);

		log.info("main server - response : {}", response);
		return response;
	}
}
