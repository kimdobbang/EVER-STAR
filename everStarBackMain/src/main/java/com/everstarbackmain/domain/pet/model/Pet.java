package com.everstarbackmain.domain.pet.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Random;

import com.everstarbackmain.domain.pet.requestdto.CreatePetRequestDto;
import com.everstarbackmain.domain.user.model.User;
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
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "pet")
public class Pet extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private Integer age;

	@Column(nullable = false)
	private LocalDate memorialDate;

	@Column(nullable = false)
	private String species;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private PetGender gender;

	@Column(nullable = false)
	private String relationship;

	@Column(nullable = false)
	private String profileImageUrl;

	@Column(nullable = false)
	private String introduction;

	@Column(nullable = false)
	private Integer questIndex;

	@Column(nullable = false)
	private Boolean isQuestCompleted;

	@Column(nullable = false)
	private Boolean isDeleted;

	@Column(nullable = false)
	private LocalDateTime lastAccessTime;

	@Column(nullable = false)
	private LocalDateTime sendLetterTime;

	@Column(nullable = false)
	private LocalDateTime lastSendLetterTime;

	@Builder
	private Pet(User user, String name, Integer age, LocalDate memorialDate, String species, PetGender gender,
		String relationship, String profileImageUrl, String introduction) {
		this.user = user;
		this.name = name;
		this.age = age;
		this.memorialDate = memorialDate;
		this.species = species;
		this.gender = gender;
		this.relationship = relationship;
		this.profileImageUrl = profileImageUrl;
		this.introduction =
			(introduction != null && !introduction.isEmpty()) ? introduction : name + " 의 사랑스런 소개글을 작성 해주세요";
		questIndex = 1;
		isQuestCompleted = false;
		isDeleted = false;
		lastAccessTime = LocalDateTime.now();
		sendLetterTime = initGenerateRandomTime();
		lastSendLetterTime = LocalDateTime.now();
	}

	// ---------------펫 인스턴스의 정보에 대한 static method ------------------------------
	public static Pet createPet(User user, CreatePetRequestDto createPetRequestDto, String profileImageUrl) {
		return Pet.builder()
			.user(user)
			.name(createPetRequestDto.getName())
			.age(createPetRequestDto.getAge())
			.memorialDate(createPetRequestDto.getMemorialDate())
			.species(createPetRequestDto.getSpecies())
			.gender(createPetRequestDto.getGender())
			.relationship(createPetRequestDto.getRelationship())
			.profileImageUrl(profileImageUrl)
			.build();
	}

	public void updatePetIntroduction(String filteredNewIntroduction) {
		this.introduction = filteredNewIntroduction;
	}

	// ----------------펫 퀘스트 관련 Static methods -----------------------------------------
	public void plusQuestIndex() {
		questIndex++;
		setTrueIsQuestCompleted();
	}

	public void plusQuestIndexByPresentation() {
		if (questIndex.equals(15)) {
			questIndex = 24;
		} else if (questIndex.equals(24)) {
			questIndex = 44;
		} else if (questIndex.equals(44)) {
			questIndex = 49;
		} else {
			questIndex++;
		}
		setTrueIsQuestCompleted();
	}

	public void setTrueIsQuestCompleted() {
		isQuestCompleted = true;
	}

	public void setFalseIsQuestCompleted() {
		isQuestCompleted = false;
	}

	// ----------------편지 서비스 관련 Static methods -----------------------------------------
	public void updatePetSendTime() {
		this.lastSendLetterTime = LocalDateTime.now();
		this.sendLetterTime = generateRandomTime();
	}

	private LocalDateTime initGenerateRandomTime() {
		Random random = new Random();
		return LocalDateTime.now().plusMinutes(1);
	}

	private LocalDateTime generateRandomTime() {
		Random random = new Random();
		int randomMinutes = 1 + random.nextInt(5);
		return LocalDateTime.now().plusWeeks(randomMinutes);
	}

	public void updateProfileImage(String profileImageUrl) {
		this.profileImageUrl = profileImageUrl;
	}
}
