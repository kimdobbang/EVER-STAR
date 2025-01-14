package com.everstarbackmain.domain.questAnswer.responseDto;

import com.everstarbackmain.domain.questAnswer.model.QuestAnswer;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Getter
public class QuestAnswerDetailResponseDto {

	private Long petId;
	private Long questId;
	private String content;
	private String imageUrl;
	private String type;

	public static QuestAnswerDetailResponseDto createQuestAnswerDetailResponseDto(QuestAnswer questAnswer) {
		return QuestAnswerDetailResponseDto.builder()
			.petId(questAnswer.getId().getPetId())
			.questId(questAnswer.getId().getQuestId())
			.content(questAnswer.getContent())
			.imageUrl(questAnswer.getImageUrl())
			.type(questAnswer.getType().getType())
			.build();
	}
}
