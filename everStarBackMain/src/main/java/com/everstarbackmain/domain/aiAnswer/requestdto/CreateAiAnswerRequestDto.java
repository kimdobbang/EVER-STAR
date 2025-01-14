package com.everstarbackmain.domain.aiAnswer.requestdto;

import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CreateAiAnswerRequestDto {

	private String content;

	private String imageUrl;

	@NotBlank
	private String type;

	@Builder
	private CreateAiAnswerRequestDto(String content, String imageUrl, String type) {
		this.content = content;
		this.imageUrl = imageUrl;
		this.type = type;
	}

	public static CreateAiAnswerRequestDto createTextAiAnswerRequestDto(String content, String type) {
		return CreateAiAnswerRequestDto.builder()
			.content(content)
			.type(type)
			.build();
	}

	public static CreateAiAnswerRequestDto createImageAiAnswerRequestDto(String imageUrl, String type) {
		return CreateAiAnswerRequestDto.builder()
			.imageUrl(imageUrl)
			.type(type)
			.build();
	}

}
