package com.everstarbackmain.domain.memorialBook.model;

import com.everstarbackmain.domain.pet.model.Pet;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "memorial_book")
public class MemorialBook {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "pet_id")
	private Pet pet;

	private String psychologicalTestResult;

	@Column(nullable = false)
	private Boolean isOpen;

	@Column(nullable = false)
	private Boolean isActive;

	@Column(nullable = false)
	private Boolean isTested;

	@Column(nullable = false)
	private Boolean isDeleted;

	private MemorialBook(Pet pet) {
		this.pet = pet;
		isOpen = false;
		isActive = false;
		isTested = false;
		isDeleted = false;
	}

	public static MemorialBook createMemorialBook(Pet pet) {
		return new MemorialBook(pet);
	}

	public void addPsychologicalTestResult(String psychologicalTestResult) {
		this.psychologicalTestResult = psychologicalTestResult;
	}

	public void changeOpenStatus() {
		isOpen = !isOpen;
	}

	public void changeActiveStatus() {
		isActive = true;
	}

	public void changeTestStatus() {
		isTested = true;
	}
}
