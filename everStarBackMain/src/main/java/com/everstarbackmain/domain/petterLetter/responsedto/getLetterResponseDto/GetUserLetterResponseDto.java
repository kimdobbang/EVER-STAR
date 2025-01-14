package com.everstarbackmain.domain.petterLetter.responsedto.getLetterResponseDto;

import java.time.LocalDateTime;

import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.petterLetter.model.PetLetter;
import com.everstarbackmain.domain.userLetter.model.UserLetter;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Getter
public class GetUserLetterResponseDto {

	private String petName;
	private String content;
	private String imageUrl;
	private LocalDateTime createdAt;

	public static GetUserLetterResponseDto createUserLetterResponseDto(PetLetter petLetter) {
		Pet pet = petLetter.getPet();
		UserLetter userLetter = petLetter.getUserLetter();
		return new GetUserLetterResponseDto(pet.getName(), userLetter.getContent(), userLetter.getImgUrl(),
			userLetter.getCreatedTime());
	}
}
