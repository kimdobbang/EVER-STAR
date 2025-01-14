package com.everstarbackmain.global.diffusionai.model;

import java.util.List;

import com.everstarbackmain.global.config.DiffusionAiConfig;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DiffusionAiResponse {

	private String status;
	private String message;
	private List<String> output;

	private DiffusionAiResponse(List<String> output) {
		this.output = output;
	}

	public DiffusionAiResponse createDiffusionAiResponse() {
		return new DiffusionAiResponse(output);
	}
}
