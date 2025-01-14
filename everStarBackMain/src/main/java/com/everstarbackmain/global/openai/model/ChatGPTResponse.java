package com.everstarbackmain.global.openai.model;

import java.util.List;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatGPTResponse {

	private List<Choice> choices;

	private ChatGPTResponse(List<Choice> choices) {
		this.choices = choices;
	}

	public static ChatGPTResponse chatGPTResponse(List<Choice> choices) {
		return new ChatGPTResponse(choices);
	}
}
