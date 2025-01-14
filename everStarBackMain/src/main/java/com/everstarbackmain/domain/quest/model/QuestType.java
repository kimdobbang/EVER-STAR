package com.everstarbackmain.domain.quest.model;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public enum QuestType {

	TEXT("TEXT"),
	TEXT_IMAGE("TEXT_IMAGE"),
	WEBRTC("WEBRTC");

	private final String type;
}
