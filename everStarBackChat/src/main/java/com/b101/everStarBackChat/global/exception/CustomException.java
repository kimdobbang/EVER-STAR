package com.b101.everStarBackChat.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CustomException {

	WRONG_TYPE_EXCEPTION(400, "WrongTypeException", "잘못된 형식의 데이터입니다."),
	NOT_EXIST_CHAT_ROOM(400, "NotExistChatRoom", "채팅방이 존재하지 않습니다."),
	OPENVIDU_EXCEPTION(400, "OpenviduException", "Openvidu 사용 중 예외가 발생하였습니다."),

	EXPIRED_JWT_EXCEPTION(401, "ExpiredJwtException", "토큰이 만료했습니다."),
	NOT_VALID_JWT_EXCEPTION(401, "NotValidJwtException", "토큰이 유효하지 않습니다."),
	NOT_FOUND_SESSION_EXCEPTION(401, "NotFoundSessionException", "세션이 존재하지 않습니다."),

	ACCESS_DENIED_EXCEPTION(403, "AccessDeniedException", "권한이 없습니다"),
	NOT_EMPTY_ROLE_EXCEPTION(403, "NotEmptyRoleException", "권한이 존재하지 않습니다."),

	NOT_FOUND_USER_EXCEPTION(404, "NotFoundUserException", "유저가 존재하지 않습니다."),
	;

	private int statusNum;
	private String errorCode;
	private String errorMessage;
}
