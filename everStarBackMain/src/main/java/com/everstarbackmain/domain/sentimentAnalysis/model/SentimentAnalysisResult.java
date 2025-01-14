package com.everstarbackmain.domain.sentimentAnalysis.model;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Getter
public class SentimentAnalysisResult {

	private Double neutral;
	private Double positive;
	private Double negative;

	public static SentimentAnalysisResult createSentimentAnalysisResult(Double neutral, Double positive,
		Double negative) {
		return SentimentAnalysisResult.builder()
			.neutral(neutral)
			.positive(positive)
			.negative(negative)
			.build();
	}

	public Double calculateAnalysis() {
		double negativeWeight = 0;
		double neutralWeight = 0.5;
		double positiveWeight = 1;

		return (negative * negativeWeight + neutral * neutralWeight + positive * positiveWeight);
	}
}
