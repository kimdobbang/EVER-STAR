package com.everstarbackmain.domain.cheeringMessage.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.everstarbackmain.domain.cheeringMessage.message.SuccessCheeringMessageMessage;
import com.everstarbackmain.domain.cheeringMessage.service.CheeringMessageService;
import com.everstarbackmain.global.util.HttpResponseUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/pets/{pet-id}/cheeringMessages")
@Slf4j(topic = "elk")
public class CheeringMessageDeleteController {

	private final CheeringMessageService cheeringMessageService;
	private final HttpResponseUtil responseUtil;

	@DeleteMapping("/{cheeringMessage-id}")
	ResponseEntity<Map<String, Object>> deleteCheeringMessage(Authentication authentication,
		@PathVariable("pet-id") Long petId,
		@PathVariable("cheeringMessage-id") Long cheeringMessageId) {
		cheeringMessageService.deleteCheeringMessage(authentication, petId, cheeringMessageId);
		ResponseEntity<Map<String, Object>> response = responseUtil.createResponse(
			SuccessCheeringMessageMessage.SUCCESS_DELETE_CHEERINGMESSAGE);

		log.info("main server - response : {}", response);

		return response;
	}
}
