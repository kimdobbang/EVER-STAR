package com.everstarbackmain.domain.cheeringMessage.model;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public enum Color {

	PINK("pink"),
	GREEN("green"),
	BLUE("blue"),
	PURPLE("purple"),
	GRAY("gray"),
	YELLOW("yellow");

	private String color;
}
