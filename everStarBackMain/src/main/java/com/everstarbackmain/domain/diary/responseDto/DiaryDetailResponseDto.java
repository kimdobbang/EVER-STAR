package com.everstarbackmain.domain.diary.responseDto;

import java.time.LocalDateTime;

import com.everstarbackmain.domain.diary.model.Diary;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Getter
public class DiaryDetailResponseDto {

	private Long id;
	private Long memorialBookId;
	private String title;
	private String content;
	private String imageUrl;
	private LocalDateTime createdTime;

	public static DiaryDetailResponseDto createDiaryDetailResponseDto(Diary diary) {
		return DiaryDetailResponseDto.builder()
			.id(diary.getId())
			.memorialBookId(diary.getMemorialBook().getId())
			.title(diary.getTitle())
			.content(diary.getContent())
			.imageUrl(diary.getImageUrl())
			.createdTime(diary.getCreatedTime())
			.build();
	}
}
