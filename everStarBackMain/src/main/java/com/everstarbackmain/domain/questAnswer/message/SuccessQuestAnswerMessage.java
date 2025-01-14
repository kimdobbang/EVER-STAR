package com.everstarbackmain.domain.questAnswer.message;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public enum SuccessQuestAnswerMessage {

	SUCCESS_CREATE_QUEST_ANSWER("질문의 답변 생성을 성공하였습니다.");

	private String message;
}
