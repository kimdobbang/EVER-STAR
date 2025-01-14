package com.everstarbackmain.domain.pet.responsedto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.pet.model.PetGender;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Getter
public class PetDetailResponseDto {

	private Long id;
	private Long userId;
	private String name;
	private Integer age;
	private LocalDate memorialDate;
	private String species;
	private PetGender gender;
	private String relationship;
	private String profileImageUrl;
	private String introduction;
	private Integer questIndex;
	private LocalDateTime lastAccessTime;

	public static PetDetailResponseDto createPetDetailResponseDto(Pet pet) {
		return PetDetailResponseDto.builder()
			.id(pet.getId())
			.userId(pet.getUser().getId())
			.name(pet.getName())
			.age(pet.getAge())
			.memorialDate(pet.getMemorialDate())
			.species(pet.getSpecies())
			.gender(pet.getGender())
			.relationship(pet.getRelationship())
			.profileImageUrl(pet.getProfileImageUrl())
			.introduction(pet.getIntroduction())
			.questIndex(pet.getQuestIndex())
			.lastAccessTime(pet.getLastAccessTime())
			.build();
	}
}
