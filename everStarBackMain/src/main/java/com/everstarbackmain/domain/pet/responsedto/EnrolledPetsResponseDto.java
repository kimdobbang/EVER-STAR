package com.everstarbackmain.domain.pet.responsedto;

import com.everstarbackmain.domain.pet.model.Pet;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class EnrolledPetsResponseDto {

	private Long id;
	private String profileImageUrl;
	private String name;

	public static EnrolledPetsResponseDto createEnrolledResponseDto(Pet pet) {
		return EnrolledPetsResponseDto.builder()
			.id(pet.getId())
			.profileImageUrl(pet.getProfileImageUrl())
			.name(pet.getName())
			.build();
	}
}