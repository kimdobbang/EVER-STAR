package com.everstarbackmain.domain.memorialBook.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.everstarbackmain.domain.memorialBook.message.SuccessMemorialBookMessage;
import com.everstarbackmain.domain.memorialBook.requestdto.MemorialBookTestResultRequestDto;
import com.everstarbackmain.domain.memorialBook.responsedto.MemorialBookDetailResponseDto;
import com.everstarbackmain.domain.memorialBook.responsedto.MemorialBookInfoResponseDto;
import com.everstarbackmain.domain.memorialBook.service.MemorialBookService;
import com.everstarbackmain.global.util.HttpResponseUtil;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/pets/{pet-id}/memorialbooks")
@Slf4j(topic = "elk")
public class MemorialBookController {

	private final MemorialBookService memorialBookService;
	private final HttpResponseUtil responseUtil;

	@PatchMapping("/{memorialbook-id}/is-open")
	public ResponseEntity<Map<String, Object>> changeOpenStatus(@PathVariable("pet-id") Long petId,
		@PathVariable("memorialbook-id") Long memorialBookId) {
		memorialBookService.changeOpenStatus(memorialBookId);

		ResponseEntity<Map<String, Object>> response = responseUtil.createResponse(
			SuccessMemorialBookMessage.SUCCESS_CHANGE_OPEN_STATUS);
		log.info("main server - request : petId {}, memorialBookId {}", petId, memorialBookId);
		log.info("main server - response : {}", response);
		return response;
	}

	@PatchMapping("/{memorialbook-id}/psychological-test")
	public ResponseEntity<Map<String, Object>> addPsychologicalTestResult(Authentication authentication,
		@PathVariable("pet-id") Long petId, @PathVariable("memorialbook-id") Long memorialBookId,
		@RequestBody @Valid MemorialBookTestResultRequestDto testResultRequestDto) {
		memorialBookService.addPsychologicalTestResult(authentication, petId, memorialBookId, testResultRequestDto);

		ResponseEntity<Map<String, Object>> response = responseUtil.createResponse(
			SuccessMemorialBookMessage.SUCCESS_ADD_PSYCHOLOGICAL_TEST_RESULT);
		log.info("main server - request : {}", testResultRequestDto);
		log.info("main server - response : {}", response);
		return response;
	}

	@GetMapping
	public ResponseEntity<Map<String, Object>> getMemorialBookInfoByPetId(@PathVariable("pet-id") Long petId) {
		MemorialBookInfoResponseDto responseDto = memorialBookService.getMemorialBookInfoByPetId(petId);

		ResponseEntity<Map<String, Object>> response = responseUtil.createResponse(responseDto);
		log.info("main server - request : petId {}", petId);
		log.info("main server - response : {}", response);
		return response;
	}

	@GetMapping("/{memorialbook-id}")
	public ResponseEntity<Map<String, Object>> getMemorialBookDetail(Authentication authentication,
		@PathVariable("pet-id") Long petId, @PathVariable("memorialbook-id") Long memorialBookId) {
		MemorialBookDetailResponseDto responseDto = memorialBookService.getMemorialBookDetail(authentication, petId,
			memorialBookId);

		ResponseEntity<Map<String, Object>> response = responseUtil.createResponse(responseDto);
		log.info("main server - request : petId {}, memorialBookId {}", petId, memorialBookId);
		log.info("main server - response : {}", response);
		return response;
	}
}
