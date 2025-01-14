package com.everstarbackmain.domain.everstar.responsedto;

import java.time.LocalDate;
import java.util.List;

import com.everstarbackmain.domain.pet.model.Pet;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class EverStarPetInfoResponseDto {

	private Long userId;
	private Long id;
	private String profileImageUrl;
	private String name;
	private String introduction;
	private Integer questIndex;
	private Integer age;
	private LocalDate memorialDate;
	private List<String> petPersonalities;

	public static EverStarPetInfoResponseDto createEverStarPetInfoResponseDto(Pet pet, List<String> petPersonalities) {
		return EverStarPetInfoResponseDto.builder()
			.userId(pet.getUser().getId())
			.id(pet.getId())
			.profileImageUrl(pet.getProfileImageUrl())
			.name(pet.getName())
			.introduction(pet.getIntroduction())
			.questIndex(pet.getQuestIndex())
			.age(pet.getAge())
			.memorialDate(pet.getMemorialDate())
			.petPersonalities(petPersonalities)
			.build();
	}
}
