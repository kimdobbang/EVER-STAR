package com.b101.everStarBackChat.domain.chat.requestDto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public enum MessageType {

	ENTER("ENTER"),
	TALK("TALK");

	private final String type;
}
