package com.everstarbackauth.domain.sms.responseDto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public enum SmsResponseMessage {
	SUCCESS_SEND("인증번호가 전송 되었습니다."),
	SUCCESS_VERIFY("인증번호가 확인되었습니다.");

	private final String message;
}
