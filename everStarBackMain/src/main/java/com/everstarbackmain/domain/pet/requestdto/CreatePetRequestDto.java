package com.everstarbackmain.domain.pet.requestdto;

import java.time.LocalDate;
import java.util.List;

import com.everstarbackmain.domain.pet.model.PetGender;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class CreatePetRequestDto {

	@NotBlank
	private String name;

	@NotNull
	private Integer age;

	@NotNull
	private LocalDate memorialDate;

	@NotBlank
	private String species;

	@NotNull
	private PetGender gender;

	@NotBlank
	private String relationship;

	@NotNull
	private List<String> personalities;

}
