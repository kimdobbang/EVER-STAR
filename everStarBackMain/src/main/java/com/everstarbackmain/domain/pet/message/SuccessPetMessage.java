package com.everstarbackmain.domain.pet.message;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public enum SuccessPetMessage {

	SUCCESS_CREATE_PET("반려동물 추가를 성공하였습니다."),
	SUCCESS_UPDATE_PET_INTRODUCTION("반려동물 소개글이 수정 되었습니다."),
	SUCCESS_GET_ALL_ENROLLED_PET("등록된 반려동물 목록 조회 성공하였습니다."),
	SUCCESS_GET_EVERSTAR_PET_INFO("영원별 반려동물 프로필 조회 성공하였습니다."),
	SUCCESS_EDIT_PET_PROFILE_IMAGE("반려동물 프로필 이미지 수정을 성공하였습니다.");

	private final String message;
}
