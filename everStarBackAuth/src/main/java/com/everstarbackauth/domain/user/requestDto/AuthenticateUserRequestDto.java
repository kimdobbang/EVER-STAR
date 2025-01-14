package com.everstarbackauth.domain.user.requestDto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.everstarbackauth.domain.user.model.Gender;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class AuthenticateUserRequestDto {

	@NotBlank
	private String email;

	@NotBlank
	private String userName;

	@NotBlank
	@Pattern(regexp = "^01(?:0|1|[6-9])[.-]?(\\d{3}|\\d{4})[.-]?(\\d{4})$")
	private String phoneNumber;

	@NotNull
	private LocalDate birthDate;

	@NotNull
	private Gender gender;

	@NotNull
	private LocalTime questReceptionTime;
}
