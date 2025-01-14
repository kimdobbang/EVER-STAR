package com.everstarbackmain.domain.user.model;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public enum Gender {

	MALE("MALE"),
	FEMALE("FEMALE"),
	GUEST("GUEST");

	private String gender;
}
