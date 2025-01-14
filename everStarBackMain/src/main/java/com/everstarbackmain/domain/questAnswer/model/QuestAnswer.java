package com.everstarbackmain.domain.questAnswer.model;

import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.quest.model.Quest;
import com.everstarbackmain.domain.questAnswer.requestDto.CreateAnswerRequestDto;
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
@Table(name = "quest_answer")
public class QuestAnswer extends BaseTimeEntity {

	@EmbeddedId
	private QuestAnswerId id;

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
	private QuestAnswerType type;

	@Column(nullable = false)
	private Boolean isDeleted;

	@Builder
	private QuestAnswer(Pet pet, Quest quest, String content, String imageUrl, QuestAnswerType type) {
		this.id = new QuestAnswerId(pet.getId(), quest.getId());
		this.pet = pet;
		this.quest = quest;
		this.content = content;
		this.imageUrl = imageUrl;
		this.type = type;
		isDeleted = false;
	}

	public static QuestAnswer createTextQuestAnswer(Pet pet, Quest quest, CreateAnswerRequestDto requestDto,
		String flteredContent) {
		return QuestAnswer.builder()
			.pet(pet)
			.quest(quest)
			.content(flteredContent)
			.type(QuestAnswerType.valueOf(requestDto.getType()))
			.build();
	}

	public static QuestAnswer createTextImageQuestAnswer(Pet pet, Quest quest, CreateAnswerRequestDto requestDto,
		String flteredContent, String imageUrl) {
		return QuestAnswer.builder()
			.pet(pet)
			.quest(quest)
			.content(flteredContent)
			.imageUrl(imageUrl)
			.type(QuestAnswerType.valueOf(requestDto.getType()))
			.build();
	}
}
