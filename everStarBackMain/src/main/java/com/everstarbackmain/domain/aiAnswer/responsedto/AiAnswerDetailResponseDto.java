package com.everstarbackmain.domain.aiAnswer.responsedto;

import com.everstarbackmain.domain.aiAnswer.model.AiAnswer;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Getter
public class AiAnswerDetailResponseDto {

	private Long petId;
	private Long questId;
	private String content;
	private String imageUrl;
	private String type;

	public static AiAnswerDetailResponseDto createAiAnswerDetailResponseDto(AiAnswer aiAnswer) {
		return AiAnswerDetailResponseDto.builder()
			.petId(aiAnswer.getId().getPetId())
			.questId(aiAnswer.getId().getQuestId())
			.content(aiAnswer.getContent())
			.imageUrl(aiAnswer.getImageUrl())
			.type(aiAnswer.getType().getType())
			.build();
	}
}
