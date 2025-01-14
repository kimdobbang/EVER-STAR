package com.everstarbackmain.global.openai.model;

import java.util.List;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TextImageMessage {

	private String role;
	private List<Content> content;

	private TextImageMessage(String role, List<Content> content) {
		this.role = role;
		this.content = content;
	}

	public static TextImageMessage createMessage(String role, List<Content> content) {
		return new TextImageMessage(role, content);
	}
}
