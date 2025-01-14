package com.everstarbackmain.domain.questAnswer.requestDto;

import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class CreateAnswerRequestDto {

	private String content;

	@NotBlank
	private String type;

}
