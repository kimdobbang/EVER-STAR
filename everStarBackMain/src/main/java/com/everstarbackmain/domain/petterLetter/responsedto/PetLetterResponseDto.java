package com.everstarbackmain.domain.petterLetter.responsedto;

import java.time.LocalDateTime;

import com.querydsl.core.annotations.QueryProjection;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class PetLetterResponseDto {
	private Long petLetterId;
	private Boolean isRead;
	private String petName;
	private String content;
	private LocalDateTime createAt;

	@QueryProjection
	public PetLetterResponseDto(Long id, Boolean isRead, String petName, String content, LocalDateTime createAt) {
		this.petLetterId = id;
		this.isRead = isRead;
		this.petName = petName;
		this.content = content;
		this.createAt = createAt;
	}
}
