package com.everstarbackmain.domain.quest.responseDto;

import com.everstarbackmain.domain.quest.model.Quest;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Getter
public class QuestDetailResponseDto {

	private Long id;
	private String content;
	private String type;

	public static QuestDetailResponseDto createQuestDetailResponseDto(Quest quest, String petName) {
		return QuestDetailResponseDto.builder()
			.id(quest.getId())
			.content(quest.getContent().replace("(이름)", petName))
			.type(quest.getType().getType())
			.build();
	}

}
