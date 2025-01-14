package com.everstarbackmain.domain.cheeringMessage.responseDto;

import com.everstarbackmain.domain.cheeringMessage.model.CheeringMessage;
import com.everstarbackmain.domain.cheeringMessage.model.Color;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Getter
public class CheeringMessageDetailResponseDto {

	private Long id;
	private String content;
	private Boolean isAnonymous;
	private String relationShip;
	private String petName;
	private Color color;

	public static CheeringMessageDetailResponseDto createCheeringMessageDetailResponseDto(
		CheeringMessage cheeringMessage) {
		return CheeringMessageDetailResponseDto.builder()
			.id(cheeringMessage.getId())
			.content(cheeringMessage.getContent())
			.isAnonymous(cheeringMessage.getIsAnonymous())
			.relationShip(cheeringMessage.getBehindPetRelationship())
			.petName(cheeringMessage.getBehindPetName())
			.color(cheeringMessage.getColor())
			.build();
	}
}
