package com.everstarbackmain.domain.sentimentAnalysis.responseDto;

import com.everstarbackmain.domain.sentimentAnalysis.model.SentimentAnalysis;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Getter
public class SentimentAnalysisDetailResponseDto {

	private Long id;
	private String totalResult;
	private Double week1Result;
	private Double week2Result;
	private Double week3Result;
	private Double week4Result;
	private Double week5Result;
	private Double week6Result;
	private Double week7Result;

	public static SentimentAnalysisDetailResponseDto createSentimentAnalysisDetailResponseDto(
		SentimentAnalysis sentimentAnalysis) {
		return SentimentAnalysisDetailResponseDto.builder()
			.id(sentimentAnalysis.getId())
			.totalResult(sentimentAnalysis.getTotalResult())
			.week1Result(sentimentAnalysis.getWeek1Result())
			.week2Result(sentimentAnalysis.getWeek2Result())
			.week3Result(sentimentAnalysis.getWeek3Result())
			.week4Result(sentimentAnalysis.getWeek4Result())
			.week5Result(sentimentAnalysis.getWeek5Result())
			.week6Result(sentimentAnalysis.getWeek6Result())
			.week7Result(sentimentAnalysis.getWeek7Result())
			.build();
	}
}
