package com.everstarbackmain.domain.cheeringMessage.message;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public enum SuccessCheeringMessageMessage {

	SUCCESS_CREATE_CHEERINGMESSAGE("응원메시지 작성을 성공하였습니다."),
	SUCCESS_DELETE_CHEERINGMESSAGE("응원 메시지 삭제 성공했습니다.");

	private final String message;
}
