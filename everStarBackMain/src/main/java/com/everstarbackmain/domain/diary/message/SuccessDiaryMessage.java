package com.everstarbackmain.domain.diary.message;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public enum SuccessDiaryMessage {

	SUCCESS_CREATE_DIARY("일기 작성을 성공하였습니다.");

	private String message;
}
