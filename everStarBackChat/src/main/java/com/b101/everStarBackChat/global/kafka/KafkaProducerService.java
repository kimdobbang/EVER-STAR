package com.b101.everStarBackChat.global.kafka;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.b101.everStarBackChat.domain.chat.requestDto.ChatMessage;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class KafkaProducerService {

	private final KafkaTemplate<String, ChatMessage> kafkaTemplate;

	public void sendMessage(ChatMessage message) {
		kafkaTemplate.send("topic_name", message);
	}
}
