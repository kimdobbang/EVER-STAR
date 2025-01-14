package com.everstarbackmain.global.diffusionai.model;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DiffusionAiRequest {

	private String key;
	private String model_id;
	private String prompt;
	private String negative_prompt;
	private String init_image;
	private Integer samples;
	private Integer num_inference_steps;
	private Double guidance_scale;
	private Double strength;
	private String scheduler;

	public DiffusionAiRequest(String key, String modelId, String prompt, String initImage) {
		this.key = key;
		this.model_id = modelId;
		this.prompt = prompt;
		this.init_image = initImage;
		negative_prompt = "nsfw";
		samples = 1;
		num_inference_steps = 30;
		guidance_scale = 7.5;
		strength = 0.8;
		scheduler = "UniPCMultistepScheduler";
	}
}
