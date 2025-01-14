package com.everstarbackmain.domain.notification.message;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public enum SuccessNotificationMessage {

	SUCCESS_SAVE_NOTIFICATION("알림 추가를 성공하였습니다.");

	private String message;
}
