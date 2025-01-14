package com.b101.everStarBackChat.domain.chat.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.b101.everStarBackChat.domain.chat.model.ChatRoom;
import com.b101.everStarBackChat.domain.chat.repository.ChatRoomRepository;
import com.b101.everStarBackChat.domain.chat.responseDto.ChatRoomResponseDto;
import com.b101.everStarBackChat.global.exception.CustomException;
import com.b101.everStarBackChat.global.exception.ExceptionResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ChatRoomService {

	private final ChatRoomRepository chatRoomRepository;

	public ChatRoomResponseDto findRoomById(String id) {
		ChatRoom chatRoom = chatRoomRepository.findById(id)
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_EXIST_CHAT_ROOM));
		return ChatRoomResponseDto.createChatRoomResponseDto(chatRoom);
	}

	@Transactional
	public ChatRoomResponseDto createChatRoom() {
		ChatRoom chatRoom = ChatRoom.createChatRoom();
		chatRoomRepository.save(chatRoom);
		return ChatRoomResponseDto.createChatRoomResponseDto(chatRoom);
	}
}
