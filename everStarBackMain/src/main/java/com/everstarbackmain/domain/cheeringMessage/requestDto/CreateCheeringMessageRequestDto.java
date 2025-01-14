package com.everstarbackmain.domain.cheeringMessage.requestDto;

import com.everstarbackmain.domain.cheeringMessage.model.Color;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class CreateCheeringMessageRequestDto {

	@NotBlank
	private String content;

	@NotNull
	private Color color;

	@NotNull
	private Boolean isAnonymous;
}
