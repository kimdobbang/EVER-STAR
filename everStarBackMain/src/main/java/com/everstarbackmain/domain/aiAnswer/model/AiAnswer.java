package com.everstarbackmain.domain.aiAnswer.model;

import com.everstarbackmain.domain.aiAnswer.requestdto.CreateAiAnswerRequestDto;
import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.quest.model.Quest;
import com.everstarbackmain.global.entity.BaseTimeEntity;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "ai_answer")
public class AiAnswer extends BaseTimeEntity {

	@EmbeddedId
	private AiAnswerId id;

	@MapsId("petId")
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "pet_id")
	private Pet pet;

	@MapsId("questId")
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "quest_id")
	private Quest quest;

	@Column(length = 1000)
	private String content;

	private String imageUrl;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private AiAnswerType type;

	@Builder
	private AiAnswer(Pet pet, Quest quest, String content, String imageUrl, AiAnswerType type) {
		this.id = new AiAnswerId(pet.getId(), quest.getId());
		this.pet = pet;
		this.quest = quest;
		this.content = content;
		this.imageUrl = imageUrl;
		this.type = type;
	}

	public static AiAnswer createAiAnswer(Pet pet, Quest quest, CreateAiAnswerRequestDto requestDto) {
		return AiAnswer.builder()
			.pet(pet)
			.quest(quest)
			.content(requestDto.getContent())
			.imageUrl(requestDto.getImageUrl())
			.type(AiAnswerType.valueOf(requestDto.getType()))
			.build();
	}
}
