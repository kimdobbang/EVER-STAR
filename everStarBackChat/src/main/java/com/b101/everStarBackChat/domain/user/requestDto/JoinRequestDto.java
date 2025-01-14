package com.b101.everStarBackChat.domain.user.requestDto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.b101.everStarBackChat.domain.user.model.Gender;
import com.b101.everStarBackChat.domain.user.model.Role;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class JoinRequestDto {

	@NotBlank
	private String email;

	@NotBlank
	private String password;

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

	@NotNull
	private Role role;

	public void passwordEncode(String encodePassword){
		this.password = encodePassword;
	}
}
