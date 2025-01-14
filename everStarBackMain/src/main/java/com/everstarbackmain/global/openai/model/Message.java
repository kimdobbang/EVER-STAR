package com.everstarbackmain.global.openai.model;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Message {

	private String role;
	private String content;

	private Message(String role, String content) {
		this.role = role;
		this.content = content;
	}

	public static Message createMessage(String role, String content) {
		return new Message(role, content);
	}
}
