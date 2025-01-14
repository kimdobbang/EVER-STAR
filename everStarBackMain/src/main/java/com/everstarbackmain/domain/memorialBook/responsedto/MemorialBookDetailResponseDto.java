package com.everstarbackmain.domain.memorialBook.responsedto;

import java.util.List;

import com.everstarbackmain.domain.aiAnswer.responsedto.AiAnswerDetailResponseDto;
import com.everstarbackmain.domain.diary.responseDto.DiaryDetailResponseDto;
import com.everstarbackmain.domain.pet.responsedto.PetDetailResponseDto;
import com.everstarbackmain.domain.quest.responseDto.QuestDetailResponseDto;
import com.everstarbackmain.domain.questAnswer.responseDto.QuestAnswerDetailResponseDto;
import com.everstarbackmain.domain.sentimentAnalysis.responseDto.SentimentAnalysisDetailResponseDto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Getter
public class MemorialBookDetailResponseDto {

	private MemorialBookInfoResponseDto memorialBook;
	private PetDetailResponseDto pet;
	private SentimentAnalysisDetailResponseDto sentimentAnalysis;
	private List<QuestDetailResponseDto> quests;
	private List<QuestAnswerDetailResponseDto> questAnswers;
	private List<AiAnswerDetailResponseDto> aiAnswers;
	private List<DiaryDetailResponseDto> diaries;

	public static MemorialBookDetailResponseDto createMemorialBookDetailResponseDto(
		MemorialBookInfoResponseDto memorialBookInfoDto,
		PetDetailResponseDto petDto, SentimentAnalysisDetailResponseDto sentimentDto,
		List<QuestDetailResponseDto> questDtos,
		List<QuestAnswerDetailResponseDto> questAnswerDtos, List<AiAnswerDetailResponseDto> aiAnswerDtos,
		List<DiaryDetailResponseDto> diaryDtos) {
		return MemorialBookDetailResponseDto.builder()
			.memorialBook(memorialBookInfoDto)
			.pet(petDto)
			.sentimentAnalysis(sentimentDto)
			.quests(questDtos)
			.questAnswers(questAnswerDtos)
			.aiAnswers(aiAnswerDtos)
			.diaries(diaryDtos)
			.build();
	}
}
