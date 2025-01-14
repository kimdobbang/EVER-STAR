package com.everstarbackmain.domain.memorialBook.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.everstarbackmain.domain.aiAnswer.model.AiAnswer;
import com.everstarbackmain.domain.aiAnswer.repository.AiAnswerRepository;
import com.everstarbackmain.domain.aiAnswer.responsedto.AiAnswerDetailResponseDto;
import com.everstarbackmain.domain.diary.model.Diary;
import com.everstarbackmain.domain.diary.repository.DiaryRepository;
import com.everstarbackmain.domain.diary.responseDto.DiaryDetailResponseDto;
import com.everstarbackmain.domain.memorialBook.model.MemorialBook;
import com.everstarbackmain.domain.memorialBook.repository.MemorialBookRepository;
import com.everstarbackmain.domain.memorialBook.requestdto.MemorialBookTestResultRequestDto;
import com.everstarbackmain.domain.memorialBook.responsedto.MemorialBookDetailResponseDto;
import com.everstarbackmain.domain.memorialBook.responsedto.MemorialBookInfoResponseDto;
import com.everstarbackmain.domain.memorialBook.util.PsychologicalTestResultMapper;
import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.pet.repository.PetRepository;
import com.everstarbackmain.domain.pet.responsedto.PetDetailResponseDto;
import com.everstarbackmain.domain.quest.model.Quest;
import com.everstarbackmain.domain.quest.repository.QuestRepository;
import com.everstarbackmain.domain.quest.responseDto.QuestDetailResponseDto;
import com.everstarbackmain.domain.questAnswer.model.QuestAnswer;
import com.everstarbackmain.domain.questAnswer.repository.QuestAnswerRepository;
import com.everstarbackmain.domain.questAnswer.responseDto.QuestAnswerDetailResponseDto;
import com.everstarbackmain.domain.sentimentAnalysis.model.SentimentAnalysis;
import com.everstarbackmain.domain.sentimentAnalysis.repository.SentimentAnalysisRepository;
import com.everstarbackmain.domain.sentimentAnalysis.responseDto.SentimentAnalysisDetailResponseDto;
import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.global.exception.CustomException;
import com.everstarbackmain.global.exception.ExceptionResponse;
import com.everstarbackmain.global.security.auth.PrincipalDetails;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class MemorialBookService {

	private final MemorialBookRepository memorialBookRepository;
	private final PetRepository petRepository;
	private final SentimentAnalysisRepository sentimentAnalysisRepository;
	private final QuestRepository questRepository;
	private final QuestAnswerRepository questAnswerRepository;
	private final AiAnswerRepository aiAnswerRepository;
	private final DiaryRepository diaryRepository;

	@Transactional
	public void changeOpenStatus(Long memorialBookId) {
		MemorialBook memorialBook = memorialBookRepository.findByIdAndIsDeleted(memorialBookId, false)
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_MEMORIAL_BOOK_EXCEPTION));
		if (!memorialBook.getIsActive()) {
			throw new ExceptionResponse(CustomException.NOT_ACTIVATED_MEMORIAL_BOOK_EXCEPTION);
		}

		memorialBook.changeOpenStatus();
	}

	@Transactional
	@Async
	public void changeActiveStatus(Long petId) {
		MemorialBook memorialBook = memorialBookRepository.findByPetIdAndIsDeleted(petId, false)
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_MEMORIAL_BOOK_EXCEPTION));

		memorialBook.changeActiveStatus();
	}

	@Transactional
	public void addPsychologicalTestResult(Authentication authentication, Long petId, Long memorialBookId,
		MemorialBookTestResultRequestDto testResultRequestDto) {
		User user = ((PrincipalDetails)authentication.getPrincipal()).getUser();
		MemorialBook memorialBook = memorialBookRepository.findByIdAndIsDeleted(memorialBookId, false)
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_MEMORIAL_BOOK_EXCEPTION));
		Pet pet = petRepository.findByIdAndIsDeleted(petId, false)
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_PET_EXCEPTION));

		if (!(pet.getUser().getId().equals(user.getId())) || !(petId.equals(memorialBook.getPet().getId()))) {
			throw new ExceptionResponse(CustomException.NOT_MY_MEMORIAL_BOOK_EXCEPTION);
		}

		addTestResultString(memorialBook, testResultRequestDto.getPsychologicalTestResult());
	}

	private void addTestResultString(MemorialBook memorialBook, Integer resultScore) {
		if (resultScore < 0 || resultScore > 27) {
			throw new ExceptionResponse(CustomException.WRONG_TYPE_EXCEPTION);
		}

		String resultMessage = PsychologicalTestResultMapper.getTestResultMessage(resultScore);
		memorialBook.addPsychologicalTestResult(resultMessage);
		memorialBook.changeTestStatus();
		memorialBook.changeActiveStatus();
	}

	public MemorialBookInfoResponseDto getMemorialBookInfoByPetId(Long petId) {
		MemorialBook memorialBook = memorialBookRepository.findByPetIdAndIsDeleted(petId, false)
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_MEMORIAL_BOOK_EXCEPTION));

		return MemorialBookInfoResponseDto.createMemorialBookDetailResponseDto(memorialBook);
	}

	public MemorialBookDetailResponseDto getMemorialBookDetail(Authentication authentication, Long petId,
		Long memorialBookId) {
		User user = ((PrincipalDetails)authentication.getPrincipal()).getUser();
		MemorialBook memorialBook = memorialBookRepository.findByIdAndIsDeleted(memorialBookId, false)
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_MEMORIAL_BOOK_EXCEPTION));
		Pet pet = petRepository.findByIdAndIsDeleted(petId, false)
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_PET_EXCEPTION));
		SentimentAnalysis sentimentAnalysis = sentimentAnalysisRepository.findByPetId(petId)
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_SENTIMENT_ANALYSIS_EXCEPTION));

		if (!memorialBook.getIsActive()) {
			throw new ExceptionResponse(CustomException.NOT_ACTIVATED_MEMORIAL_BOOK_EXCEPTION);
		}

		if (!(memorialBook.getPet().getUser().getId().equals(user.getId())) && !memorialBook.getIsOpen()) {
			throw new ExceptionResponse(CustomException.NOT_OPEN_MEMORIAL_BOOK_EXCEPTION);
		}

		List<Quest> quests = questRepository.findAll();
		List<QuestAnswer> questAnswers = questAnswerRepository.findByPetIdAndIsDeleted(petId, false);
		List<AiAnswer> aiAnswers = aiAnswerRepository.findByPetId(petId);
		List<Diary> diaries = diaryRepository.findByMemorialBookIdAndIsDeleted(memorialBookId, false);

		return convertToMemorialBookDetailDto(memorialBook, pet, sentimentAnalysis, quests, questAnswers, aiAnswers,
			diaries);
	}

	private MemorialBookDetailResponseDto convertToMemorialBookDetailDto(MemorialBook memorialBook, Pet pet,
		SentimentAnalysis sentimentAnalysis, List<Quest> quests, List<QuestAnswer> questAnswers,
		List<AiAnswer> aiAnswers, List<Diary> diaries) {

		String petName = pet.getName();

		return MemorialBookDetailResponseDto.builder()
			.memorialBook(MemorialBookInfoResponseDto.createMemorialBookDetailResponseDto(memorialBook))
			.pet(PetDetailResponseDto.createPetDetailResponseDto(pet))
			.sentimentAnalysis(
				SentimentAnalysisDetailResponseDto.createSentimentAnalysisDetailResponseDto(sentimentAnalysis))
			.quests(quests.stream()
				.map(quest -> QuestDetailResponseDto.createQuestDetailResponseDto(quest, petName))
				.collect(Collectors.toList()))
			.questAnswers(questAnswers.stream()
				.map(QuestAnswerDetailResponseDto::createQuestAnswerDetailResponseDto)
				.collect(Collectors.toList()))
			.aiAnswers(aiAnswers.stream()
				.map(AiAnswerDetailResponseDto::createAiAnswerDetailResponseDto)
				.collect(Collectors.toList()))
			.diaries(diaries.stream()
				.map(DiaryDetailResponseDto::createDiaryDetailResponseDto)
				.collect(Collectors.toList()))
			.build();
	}

}
