package com.everstarbackmain.domain.memorialBook.requestdto;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class MemorialBookTestResultRequestDto {

	@NotNull
	private Integer psychologicalTestResult;

}
