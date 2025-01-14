package com.b101.everStarBackChat.domain.chat.responseDto;

import com.b101.everStarBackChat.domain.chat.model.ChatRoom;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class ChatRoomResponseDto {

	private String roomId;

	public static ChatRoomResponseDto createChatRoomResponseDto(ChatRoom chatRoom) {
		return ChatRoomResponseDto.builder()
			.roomId(chatRoom.getId())
			.build();
	}
}
