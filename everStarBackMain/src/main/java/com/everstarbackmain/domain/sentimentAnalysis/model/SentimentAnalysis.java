package com.everstarbackmain.domain.sentimentAnalysis.model;

import com.everstarbackmain.domain.pet.model.Pet;

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
@Table(name = "sentiment_analysis")
public class SentimentAnalysis {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "pet_id")
	private Pet pet;

	private String totalResult;
	private Double week1Result;
	private Double week2Result;
	private Double week3Result;
	private Double week4Result;
	private Double week5Result;
	private Double week6Result;
	private Double week7Result;

	private SentimentAnalysis(Pet pet) {
		this.pet = pet;
	}

	public static SentimentAnalysis createSentimentAnalysis(Pet pet) {
		return new SentimentAnalysis(pet);
	}

	public void addTotalResult(String totalResult) {
		this.totalResult = totalResult;
	}

	public void addWeekResult(Double weekResult, int week) {
		switch (week) {
			case 1:
				this.week1Result = weekResult;
				break;
			case 2:
				this.week2Result = weekResult;
				break;
			case 3:
				this.week3Result = weekResult;
				break;
			case 4:
				this.week4Result = weekResult;
				break;
			case 5:
				this.week5Result = weekResult;
				break;
			case 6:
				this.week6Result = weekResult;
				break;
			case 7:
				this.week7Result = weekResult;
		}
	}

}
