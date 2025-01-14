package com.everstarbackmain.domain.questAnswer.model;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public enum QuestAnswerType {

	TEXT("TEXT"),
	TEXT_IMAGE("TEXT_IMAGE"),
	WEBRTC("WEBRTC");

	private String type;
}
