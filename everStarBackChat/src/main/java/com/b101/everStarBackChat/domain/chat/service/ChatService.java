package com.b101.everStarBackChat.domain.chat.service;

import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import com.b101.everStarBackChat.domain.chat.requestDto.ChatMessage;
import com.b101.everStarBackChat.domain.chat.requestDto.MessageType;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatService {

	private final SimpMessageSendingOperations messagingTemplate;

	public void sendMessage(ChatMessage message) {
		if (MessageType.ENTER.equals(message.getType())) {
			message.updateEnterMessage(message.getSender() + "님이 입장하셨습니다.");
		}

		messagingTemplate.convertAndSend("/api/chat/sub/chat/room/" + message.getRoomId(), message);
	}
}
