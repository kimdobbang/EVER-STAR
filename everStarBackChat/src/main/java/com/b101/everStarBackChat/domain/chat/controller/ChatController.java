package com.b101.everStarBackChat.domain.chat.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.RestController;

import com.b101.everStarBackChat.domain.chat.requestDto.ChatMessage;
import com.b101.everStarBackChat.domain.chat.service.ChatService;
import com.b101.everStarBackChat.global.kafka.KafkaProducerService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j(topic = "elk")
public class ChatController {

	private final ChatService chatService;
	private final KafkaProducerService producerService;

	@MessageMapping("/chat/message")
	public void sendMessage(@Payload ChatMessage message) {
		producerService.sendMessage(message);
	}
}
