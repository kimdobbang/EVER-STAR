package com.everstarbackmain.domain.petterLetter.model;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public enum SendType {

	USER("USER"),
	PET("PET");

	private final String sendType;
}
