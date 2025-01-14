package com.everstarbackmain.domain.quest.service;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.pet.repository.PetRepository;
import com.everstarbackmain.domain.quest.model.Quest;
import com.everstarbackmain.domain.quest.repository.QuestRepository;
import com.everstarbackmain.domain.quest.responseDto.QuestDetailResponseDto;
import com.everstarbackmain.domain.sse.SseService;
import com.everstarbackmain.global.exception.CustomException;
import com.everstarbackmain.global.exception.ExceptionResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class QuestService {

	private final QuestRepository questRepository;
	private final PetRepository petRepository;
	private final SseService sseService;

	public QuestDetailResponseDto getQuestDetail(Long petId, Long questId) {

		Pet pet = petRepository.findByIdAndIsDeleted(petId, false)
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_PET_EXCEPTION));

		Quest quest = questRepository.findById(questId)
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_QUEST_EXCEPTION));

		if (!pet.getQuestIndex().equals(questId.intValue())) {
			throw new ExceptionResponse(CustomException.NOT_EQUAL_PET_QUEST_INDEX_AND_QUEST_NUMBER);
		}

		return QuestDetailResponseDto.createQuestDetailResponseDto(quest, pet.getName());
	}

	@Transactional
	@Async
	public void changePetQuestCompleted(Long petId) {
		log.info("main server - 스케줄 실행");
		Pet pet = petRepository.findByIdAndIsDeleted(petId, false)
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_PET_EXCEPTION));
		pet.setFalseIsQuestCompleted();

		// 상태 변경 후 SSE 알림 전송
		log.info(" main-server PetQuest isCompleted변경완료: petId={}, questId={}, isQuestCompleted={}", petId, pet.getQuestIndex(), pet.getIsQuestCompleted());
		sseService.updateQuestStatusNotification(pet.getUser(), pet.getId());
	}
}
