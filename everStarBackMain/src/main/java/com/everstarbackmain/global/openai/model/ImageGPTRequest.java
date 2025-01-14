package com.everstarbackmain.global.openai.model;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ImageGPTRequest {

	private String model;
	private String prompt;
	private String response_format;

	public ImageGPTRequest(String prompt) {
		model = "dall-e-3";
		this.prompt = prompt;
		response_format = "b64_json";
	}
}
