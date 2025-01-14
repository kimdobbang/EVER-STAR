package com.everstarbackmain.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CustomException {

	WRONG_TYPE_EXCEPTION(400, "WrongTypeException", "잘못된 형식의 데이터입니다."),
	S3_UPLOAD_EXCEPTION(400, "S3UploadException", "파일 업로드를 실패했습니다."),
	NAVER_SENTIMENT_API_EXCEPTION(400, "NaverSentimentApiException", "네이버 감정 분석 API 사용 중 예외가 발생했습니다."),
	OPENAI_API_EXCEPTION(400, "OpenAiException", "OpenAI API 사용 중 예외가 발생했습니다."),
	NOT_ACTIVATED_MEMORIAL_BOOK_EXCEPTION(400, "NotActivatedMemorialBookException", "메모리얼북이 활성화 상태가 아닙니다."),
	OPENVIDU_EXCEPTION(400, "OpenviduException", "Openvidu 사용 중 예외가 발생하였습니다."),
	NOT_EQUAL_PET_QUEST_INDEX_AND_QUEST_NUMBER(400, "NotEqualPetQuestIndexAndQuestNumber", "반려동물의 퀘스트 순서와 조회하려는 퀘스트 번호가 다릅니다. "),

	NOT_FOUND_SESSION_EXCEPTION(401, "NotFoundSessionException", "세션이 존재하지 않습니다."),
	EXPIRED_JWT_EXCEPTION(401, "ExpiredJwtException", "토큰이 만료했습니다."),
	NOT_VALID_JWT_EXCEPTION(401, "NotValidJwtException", "토큰이 유효하지 않습니다."),

	NOT_ACCESS_SEND_LETTER_ANSWER(403, "sendAnswerAlreadyExistsAtThisLetterException", " 이미 보낸 답장이 존재하는 편지입니다."),
	NOT_MY_MEMORIAL_BOOK_EXCEPTION(403, "NotMyMemorialBookException", "사용자의 메모리얼북이 아닙니다."),
	NOT_OPEN_MEMORIAL_BOOK_EXCEPTION(403, "NotOpenMemorialBookException", "메모리얼북이 공개되지 않았습니다."),
	ACCESS_LETTER_SEND_TYPE(403, "AccessLetterSendTypeException", "접근할 수 없는 타입이에요."),
	NOT_EMPTY_ROLE_EXCEPTION(403, "NotEmptyRoleException", "권한이 존재하지 않습니다."),
	ACCESS_DENIED_EXCEPTION(403, "AccessDeniedException", "권한이 없습니다"),

	NOT_FOUND_PET_EXCEPTION(404, "NotFoundPetException", "반려동물이 존재하지 않습니다."),
	NOT_FOUND_PETLETTER_EXCEPTION(404, "NotFoundPetLetterException", "반려동물에게 온 편지가 존재하지 않습니다."),
	NOT_FOUND_USER_EXCEPTION(404, "NotFoundUserException", "유저가 존재하지 않습니다."),
	NOT_FOUND_NOTIFICATION_EXCEPTION(404, "NotFoundNotificationException", "알림이 존재하지 않습니다."),
	NOT_FOUND_MEMORIAL_BOOK_EXCEPTION(404, "NotFoundMemorialBookException", "메모리얼북이 존재하지 않습니다."),
	NOT_FOUND_CHEERING_MESSAGE_EXCEPTION(404, "NotFoundCheering_Message_Exception", "응원메시지가 존재하지 않습니다."),
	NOT_FOUND_SENTIMENT_ANALYSIS_EXCEPTION(404, "NotFoundSentimentAnalysisException", "감정 분석 결과가 존재하지 않습니다."),
	NOT_FOUND_QUEST_EXCEPTION(404, "NotFoundQuestException", "퀘스트가 존재하지 않습니다."),
	ALL_QUESTS_COMPLETED_EXCEPTION(400, "AllQuestsCompleted", "모든	퀘스트를 완료 하셨습니다! 앞으로 영원별을 추억하며 행복하시길 바랍니다♥"),
	ALREADY_COMPLETED_QUEST_EXCEPTION(400, "AlreadyCompletedQuestException", "이미 완료된 퀘스트입니다!"),
	QUEST_INDEX_NOT_MATCH_EXCEPTION(400, "QuestIndexNotMatchException", "현재 퀘스트와 일치하지 않습니다.")
	;


	private int statusNum;
	private String errorCode;
	private String errorMessage;
}
