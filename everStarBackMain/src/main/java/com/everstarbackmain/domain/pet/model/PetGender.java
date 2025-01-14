package com.everstarbackmain.domain.pet.model;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public enum PetGender {

	MALE("MALE"),
	FEMALE("FEMALE");

	private final String gender;
}
