package com.everstarbackauth.domain.user.responseDto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public enum JoinResponseMessage {
    SUCCESS_SIGNUP("회원가입 성공");

    private final String message;
}
