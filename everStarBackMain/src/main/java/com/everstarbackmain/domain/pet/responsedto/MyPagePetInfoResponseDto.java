package com.everstarbackmain.domain.pet.responsedto;

import java.time.LocalDate;
import java.util.List;

import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.pet.model.PetGender;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Getter
public class MyPagePetInfoResponseDto {

	private Long id;
	private Long userId;
	private String profileImageUrl;
	private String name;
	private PetGender gender;
	private Integer age;
	private Integer questIndex;
	private LocalDate memorialDate;
	private String relationship;
	private String species;
	private List<String> petPersonalities;

	public static MyPagePetInfoResponseDto createMyPagePetInfoDto(Pet pet, List<String> petPersonalities) {

		return MyPagePetInfoResponseDto.builder()
			.id(pet.getId())
			.userId(pet.getUser().getId())
			.profileImageUrl(pet.getProfileImageUrl())
			.name(pet.getName())
			.gender(pet.getGender())
			.age(pet.getAge())
			.questIndex(pet.getQuestIndex())
			.memorialDate(pet.getMemorialDate())
			.relationship(pet.getRelationship())
			.species(pet.getSpecies())
			.petPersonalities(petPersonalities)
			.build();
	}
}
