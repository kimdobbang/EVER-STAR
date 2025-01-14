package com.everstarbackmain.domain.aiAnswer.model;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public enum AiAnswerType {

	TEXT("TEXT"),
	IMAGE("IMAGE"),
	WEBRTC("WEBRTC");

	private String type;

}
