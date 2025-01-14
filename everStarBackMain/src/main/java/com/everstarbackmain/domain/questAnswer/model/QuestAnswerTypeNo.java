package com.everstarbackmain.domain.questAnswer.model;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum QuestAnswerTypeNo {

	TEXT_TO_TEXT("TEXT_TO_TEXT", Arrays.asList(2L, 5L, 9L, 12L, 15L, 16L, 23L, 26L, 30L, 33L)),
	TEXT_TO_MUSIC("TEXT_TO_MUSIC", Arrays.asList(31L)),
	TEXT_TO_IMAGE_ART("TEXT_TO_IMAGE_ART", Arrays.asList(44L)),
	TEXT_IMAGE_TO_TEXT("TEXT_IMAGE_TO_TEXT", Arrays.asList(37L, 45L)),
	TEXT_IMAGE_TO_IMAGE_PICTURE("TEXT_IMAGE_TO_IMAGE_PICTURE", Arrays.asList(3L, 17L)),
	TEXT_IMAGE_TO_IMAGE_ART("TEXT_IMAGE_TO_IMAGE_ART", Arrays.asList(10L, 40L));

	private final String type;
	private final List<Long> questNumbers;

	public static Optional<String> findTypeByQuestNumber(Long questNumber) {
		return Arrays.stream(QuestAnswerTypeNo.values())
			.filter(questAnswerTypeNo -> questAnswerTypeNo.hasQuestNumber(questNumber))
			.map(QuestAnswerTypeNo::getType)
			.findFirst();
	}

	private boolean hasQuestNumber(Long questNumber) {
		return questNumbers.contains(questNumber);
	}
}
