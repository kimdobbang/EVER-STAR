package com.b101.everStarBackChat.domain.chat.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.b101.everStarBackChat.domain.chat.responseDto.ChatRoomResponseDto;
import com.b101.everStarBackChat.domain.chat.service.ChatRoomService;
import com.b101.everStarBackChat.global.util.HttpResponseUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chat")
@Slf4j(topic = "elk")
public class ChatRoomController {

	private final ChatRoomService chatRoomService;
	private final HttpResponseUtil responseUtil;

	@GetMapping("/room/{room-id}")
	public ResponseEntity<Map<String, Object>> getRoom(@PathVariable("room-id") String roomId) {
		ChatRoomResponseDto responseDto = chatRoomService.findRoomById(roomId);
		ResponseEntity<Map<String, Object>> response = responseUtil.createResponse(responseDto);

		log.info("chat server - request : roomId {}", roomId);
		log.info("chat server - response : chatRoomResponseDto {}", response);
		return response;
	}

	@PostMapping("/room")
	public ResponseEntity<Map<String, Object>> createRoom() {
		ChatRoomResponseDto responseDto = chatRoomService.createChatRoom();
		ResponseEntity<Map<String, Object>> response = responseUtil.createResponse(responseDto);

		log.info("chat server - request : roomId {}", responseDto.getRoomId());
		log.info("chat server - response : chatRoomResponseDto {}", response);
		return response;
	}
}
