package com.everstarbackmain.domain.everstar.controller;

import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.everstarbackmain.domain.everstar.responsedto.EverStarPetInfoResponseDto;
import com.everstarbackmain.domain.everstar.responsedto.EverStarPetSearchResponseDto;
import com.everstarbackmain.domain.everstar.service.EverStarService;

import com.everstarbackmain.global.util.HttpResponseUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/everstar")
@Slf4j(topic = "elk")
public class EverStarController {

	private final EverStarService everStarService;
	private final HttpResponseUtil responseUtil;

	@GetMapping("/pets/{pet-id}")
	public ResponseEntity<Map<String, Object>> getEverStar(@PathVariable("pet-id") Long petId) {
		EverStarPetInfoResponseDto responseDto = everStarService.getEverStarPetInfo(petId);

		ResponseEntity<Map<String, Object>> response = responseUtil.createResponse(responseDto);
		log.info("main - sever : getEverStarPetInfo: {}", responseDto);
		log.info("main server - response : {}", response);

		return response;
	}

	@GetMapping("/pets/random")
	public ResponseEntity<Map<String, Object>> getRandomEverStar(@RequestParam Long excludePetId) {

		EverStarPetInfoResponseDto responseDto = everStarService.getRandomEverStarPetInfo(excludePetId);

		ResponseEntity<Map<String, Object>> response = responseUtil.createResponse(responseDto);
		log.info("main - server : getRandomEverStarPetInfo: {}", responseDto);
		log.info("main server - response : {}", response);

		return response;
	}

	@GetMapping("/pets/search")
	public ResponseEntity<Map<String, Object>> getEverStarSearch(@RequestParam(name = "petname") String petName,
		Pageable pageable) {
		Page<EverStarPetSearchResponseDto> responseDto = everStarService.getPetSearchByName(petName, pageable);

		ResponseEntity<Map<String, Object>> response = responseUtil.createResponse(responseDto);
		log.info("main server - response : {}", response);

		return response;
	}
}
