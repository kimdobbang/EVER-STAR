package com.everstarbackmain.domain.quest.controller;


import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.everstarbackmain.domain.quest.responseDto.QuestDetailResponseDto;
import com.everstarbackmain.domain.quest.service.QuestService;
import com.everstarbackmain.global.util.HttpResponseUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/")
@Slf4j(topic = "elk")
public class QuestController {

	private final QuestService questService;
	private final HttpResponseUtil responseUtil;

	// 퀘스트 도착 알림에 맵
	@GetMapping("/pets/{pet-id}/quests/{quest-id}")
	public ResponseEntity<Map<String, Object>> getQuestDetail(@PathVariable("pet-id") Long petId,
		@PathVariable("quest-id") Long questId) {
		QuestDetailResponseDto responseDto = questService.getQuestDetail(petId, questId);
		ResponseEntity<Map<String, Object>> response = responseUtil.createResponse(responseDto);
		return response;
	}
}
