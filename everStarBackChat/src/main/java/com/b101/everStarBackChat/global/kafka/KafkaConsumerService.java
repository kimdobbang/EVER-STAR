package com.b101.everStarBackChat.global.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.b101.everStarBackChat.domain.chat.requestDto.ChatMessage;
import com.b101.everStarBackChat.global.config.KafkaValueConfig;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class KafkaConsumerService {

	private final SimpMessagingTemplate messagingTemplate;

	@KafkaListener(topics = "topic_name", groupId = "${spring.kafka.consumer.group}")
	public void listen(ChatMessage message) {
		log.info(message.getMessage());
		messagingTemplate.convertAndSend("/api/chat/sub/chat/room/" + message.getRoomId(), message);
	}
}