package com.everstarbackmain.domain.cheeringMessage.responseDto;

import com.everstarbackmain.domain.cheeringMessage.model.Color;
import com.querydsl.core.annotations.QueryProjection;

import lombok.Getter;

@Getter
public class CheeringMessageResponseDto {
	private Long cheeringMessageId;
	private String content;
	private Boolean isAnonymous;
	private String relationShip;
	private String petName;
	private Color color;

	@QueryProjection
	public CheeringMessageResponseDto(Long cheeringMessageId, String content, Boolean isAnonymous, String relationShip,
		String petName, Color color) {
		this.cheeringMessageId = cheeringMessageId;
		this.content = content;
		this.isAnonymous = isAnonymous;
		this.relationShip = relationShip;
		this.petName = petName;
		this.color = color;
	}
}
