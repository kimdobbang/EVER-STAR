package com.everstarbackmain.domain.userLetter.message;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public enum SuccessUserLetterMessage {
	SUCCESS_WRITE_LETTER("편지 쓰기가 성공하였습니다."),
	SUCCESS_WRITE_LETTER_ANSWER("편지 답장 쓰기가 성공하였습니다.");

	private final String message;
}
