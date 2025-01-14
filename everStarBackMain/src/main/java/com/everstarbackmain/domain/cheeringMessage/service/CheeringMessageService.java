package com.everstarbackmain.domain.cheeringMessage.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.everstarbackmain.domain.cheeringMessage.model.CheeringMessage;
import com.everstarbackmain.domain.cheeringMessage.repository.CheeringMessageRepository;
import com.everstarbackmain.domain.cheeringMessage.requestDto.CreateCheeringMessageRequestDto;
import com.everstarbackmain.domain.cheeringMessage.responseDto.CheeringMessageDetailResponseDto;
import com.everstarbackmain.domain.cheeringMessage.responseDto.CheeringMessageResponseDto;
import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.pet.repository.PetRepository;
import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.global.exception.CustomException;
import com.everstarbackmain.global.exception.ExceptionResponse;
import com.everstarbackmain.global.security.auth.PrincipalDetails;
import com.vane.badwordfiltering.BadWordFiltering;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j(topic = "elk")
public class CheeringMessageService {

	private final CheeringMessageRepository cheeringMessageRepository;
	private final PetRepository petRepository;

	@Transactional
	public CheeringMessageDetailResponseDto createCheeringMessage(Authentication authentication, Long petId, Long findPetId,
		CreateCheeringMessageRequestDto requestDto) {
		User user = ((PrincipalDetails)authentication.getPrincipal()).getUser();
		Pet pet = petRepository.findByIdAndUserAndIsDeleted(petId, user, false).orElseThrow(() -> new ExceptionResponse(
			CustomException.NOT_FOUND_PET_EXCEPTION));

		Pet findPet = petRepository.findByIdAndIsDeleted(findPetId, false)
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_PET_EXCEPTION));

		String filteredContent = filterBadWords(requestDto.getContent());

		if (requestDto.getIsAnonymous()) {
			CheeringMessage cheeringMessage = CheeringMessage.createAnonymousCheeringMessage(requestDto, findPet,filteredContent);
			cheeringMessageRepository.save(cheeringMessage);
			CheeringMessageDetailResponseDto responseDto = CheeringMessageDetailResponseDto.createCheeringMessageDetailResponseDto(cheeringMessage);
			return responseDto;
		}

		CheeringMessage cheeringMessage = CheeringMessage.createNoAnonymousCheeringMessage(requestDto, findPet, pet, filteredContent);
		cheeringMessageRepository.save(cheeringMessage);
		CheeringMessageDetailResponseDto responseDto = CheeringMessageDetailResponseDto.createCheeringMessageDetailResponseDto(cheeringMessage);
		return responseDto;
	}

	private String filterBadWords(String content) {
		BadWordFiltering badWordFiltering = new BadWordFiltering();
		return badWordFiltering.change(content, new String[] {"_", "-", "1", " ", ".", "@"});
	}

	public Page<CheeringMessageResponseDto> getCheeringMessages(Long findPetId, Pageable pageable) {
		Pet pet = petRepository.findByIdAndIsDeleted(findPetId, false)
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_PET_EXCEPTION));

		return cheeringMessageRepository.findCheeringMessagesByPetId(pet, pageable);
	}

	public CheeringMessageDetailResponseDto getCheeringMessageDetail(Long petId, Long cheeringMessageId) {
		Pet pet = petRepository.findByIdAndIsDeleted(petId, false)
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_PET_EXCEPTION));

		CheeringMessage cheeringMessage = cheeringMessageRepository.findCheeringMessageByIdAndPetAndIsDeleted(
				cheeringMessageId, pet, false)
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_CHEERING_MESSAGE_EXCEPTION));

		CheeringMessageDetailResponseDto responseDto = CheeringMessageDetailResponseDto.createCheeringMessageDetailResponseDto(
			cheeringMessage);
		return responseDto;
	}

	@Transactional
	public void deleteCheeringMessage(Authentication authentication, Long petId, Long cheeringMessageId) {
		User user = ((PrincipalDetails)authentication.getPrincipal()).getUser();

		Pet pet = petRepository.findByIdAndUserAndIsDeleted(petId, user, false)
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_PET_EXCEPTION));

		CheeringMessage cheeringMessage = cheeringMessageRepository.findCheeringMessageByIdAndPetAndIsDeleted(
				cheeringMessageId, pet, false)
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_CHEERING_MESSAGE_EXCEPTION));
		cheeringMessage.deleteCheeringMessage();
	}
}
