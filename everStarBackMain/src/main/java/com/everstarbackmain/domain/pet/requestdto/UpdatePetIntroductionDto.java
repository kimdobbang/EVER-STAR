package com.everstarbackmain.domain.pet.requestdto;

import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UpdatePetIntroductionDto {

	@NotBlank
	private String introduction;
}
