package com.everstarbackmain.domain.memorialBook.util;

import java.util.Arrays;
import java.util.List;

import com.everstarbackmain.domain.memorialBook.message.PsychologicalTestResultMessage;
import com.everstarbackmain.global.exception.CustomException;
import com.everstarbackmain.global.exception.ExceptionResponse;

public class PsychologicalTestResultMapper {

	private static final List<TestResultRange> testResultRanges = Arrays.asList(
		new TestResultRange(0, 4, PsychologicalTestResultMessage.NORMAL),
		new TestResultRange(5, 9, PsychologicalTestResultMessage.MILD),
		new TestResultRange(10, 14, PsychologicalTestResultMessage.MODERATE),
		new TestResultRange(15, 19, PsychologicalTestResultMessage.MODERATELY_SEVERE),
		new TestResultRange(20, 27, PsychologicalTestResultMessage.SEVERE)
	);

	public static String getTestResultMessage(int score) {
		return testResultRanges.stream()
			.filter(range -> range.isInRange(score))
			.findFirst()
			.orElseThrow(() -> new ExceptionResponse(CustomException.WRONG_TYPE_EXCEPTION))
			.getMessage();
	}

	private static class TestResultRange {
		private final int min;
		private final int max;
		private final PsychologicalTestResultMessage message;

		public TestResultRange(int min, int max, PsychologicalTestResultMessage message) {
			this.min = min;
			this.max = max;
			this.message = message;
		}

		public boolean isInRange(int score) {
			return score >= min && score <= max;
		}

		public String getMessage() {
			return message.getMessage();
		}
	}
}

