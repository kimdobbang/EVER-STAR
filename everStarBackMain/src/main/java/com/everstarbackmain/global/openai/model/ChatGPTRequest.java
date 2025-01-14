package com.everstarbackmain.global.openai.model;

import java.util.ArrayList;
import java.util.List;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatGPTRequest {

	private String model;
	private List<Message> messages = new ArrayList<>();

	public ChatGPTRequest(String model, String prompt) {
		this.model = model;
		this.messages.add(Message.createMessage("user", prompt));
	}

	private ChatGPTRequest(String model, String systemPrompt, String userPrompt) {
		this.model = model;
		this.messages.add(Message.createMessage("system", systemPrompt));
		this.messages.add(Message.createMessage("user", userPrompt));
	}

	public static ChatGPTRequest createChatGPTRequest(String model, String systemPrompt, String userPrompt) {
		return new ChatGPTRequest(model, systemPrompt, userPrompt);
	}
}