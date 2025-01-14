package com.everstarbackmain.global.openai.model;

import java.util.ArrayList;
import java.util.List;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TextImageGPTRequest {

	private String model;
	private List<TextImageMessage> messages = new ArrayList<>();

	public TextImageGPTRequest(String model, List<Content> content) {
		this.model = model;
		this.messages.add(TextImageMessage.createMessage("user", content));
	}
}
