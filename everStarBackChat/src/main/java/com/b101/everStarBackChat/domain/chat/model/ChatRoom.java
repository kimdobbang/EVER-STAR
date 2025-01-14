package com.b101.everStarBackChat.domain.chat.model;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "chat_room")
public class ChatRoom {

	@Id
	private String id;

	private ChatRoom(String roomId) {
		this.id = roomId;
	}

	public static ChatRoom createChatRoom() {
		return new ChatRoom(UUID.randomUUID().toString());
	}
}
