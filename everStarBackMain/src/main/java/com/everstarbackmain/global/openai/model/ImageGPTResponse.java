package com.everstarbackmain.global.openai.model;

import java.util.List;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ImageGPTResponse {

	private List<EncodedImage> data;

	private ImageGPTResponse(List<EncodedImage> data) {
		this.data = data;
	}

	public static ImageGPTResponse createImageGPTResponse(List<EncodedImage> data) {
		return new ImageGPTResponse(data);
	}
}
