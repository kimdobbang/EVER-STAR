package com.everstarbackmain.domain.memorialBook.message;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public enum PsychologicalTestResultMessage {

	// TODO: 우울감 심리 검사 결과에 따른 메시지는 추후 조정 가능
	NORMAL("일상생활의 지장을 초래할만한 우울 관련 증상이 거의 보이지 않았습니다."),
	MILD("경미한 수준의 우울감이 있으나 일상생활에 지장을 줄 정도는 아닙니다."),
	MODERATE("일생상활 적응에 일부 영향을 미칠 수 있어 주의 깊은 관찰과 관심이 필요합니다."),
	MODERATELY_SEVERE("일상생활 적응에 일부 영향을 미칠 경우, 정신건강 전문가의 도움을 받아 보시기를 권해 드립니다."),
	SEVERE("일상생활의 다양한 영역에서 어려움이 초래될경우, 추가적인 평가나 정신건강 전문가의 도움을 받아보시기를 권해 드립니다.");

	private String message;
}
