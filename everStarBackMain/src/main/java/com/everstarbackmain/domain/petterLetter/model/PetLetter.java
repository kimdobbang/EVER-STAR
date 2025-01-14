package com.everstarbackmain.domain.petterLetter.model;

import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.userLetter.model.UserLetter;
import com.everstarbackmain.global.entity.BaseTimeEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "pet_letter")
public class PetLetter extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "pet_id")
	private Pet pet;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_letter_id")
	private UserLetter userLetter;

	@Column(nullable = false)
	private Boolean isRead;

	@Column(nullable = false)
	private Boolean isDeleted;

	@Lob
	@Column(nullable = false, columnDefinition = "TEXT")
	private String content;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private SendType sendType;

	@Builder
	private PetLetter(Pet pet, UserLetter userLetter, Boolean isRead, String content, SendType sendType) {
		this.pet = pet;
		this.userLetter = userLetter;
		this.isRead = isRead;
		this.isDeleted = false;
		this.content = content;
		this.sendType = sendType;
	}

	public static PetLetter writePetLetterAnswer(UserLetter userLetter, String filteredContent) {
		return PetLetter.builder()
			.pet(userLetter.getPet())
			.userLetter(userLetter)
			.isRead(false)
			.content(filteredContent)
			.sendType(SendType.USER)
			.build();
	}

	public static PetLetter writePetLetter(Pet pet, String filteredContent) {
		return PetLetter.builder()
			.pet(pet)
			.isRead(false)
			.content(filteredContent)
			.sendType(SendType.PET)
			.build();
	}

	public void readPetLetter() {
		this.isRead = true;
	}

	public void fetchReplyLetter(UserLetter userLetter) {
		this.userLetter = userLetter;
	}
}
