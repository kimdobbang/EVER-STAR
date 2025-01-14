package com.everstarbackmain.domain.notification.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.everstarbackmain.domain.notification.message.SuccessNotificationMessage;
import com.everstarbackmain.domain.notification.requestdto.NotificationCreateRequestDto;
import com.everstarbackmain.domain.notification.service.NotificationService;
import com.everstarbackmain.global.util.HttpResponseUtil;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notifications")
@Slf4j(topic = "elk")
public class NotificationController {

	private final NotificationService notificationService;
	private final HttpResponseUtil responseUtil;

	@PostMapping
	public ResponseEntity<Map<String, Object>> createNotification(Authentication authentication, @Valid @RequestBody
	NotificationCreateRequestDto requestDto) {
		notificationService.saveNotification(authentication, requestDto);
		ResponseEntity<Map<String, Object>> response = responseUtil.createResponse(
			SuccessNotificationMessage.SUCCESS_SAVE_NOTIFICATION);

		log.info("main server - request : {}", requestDto);
		log.info("main server - response : {}", response);
		return response;
	}
}
