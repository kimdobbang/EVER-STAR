package com.everstarbackmain.domain.everstar.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.everstarbackmain.domain.everstar.responsedto.EverStarPetInfoResponseDto;
import com.everstarbackmain.domain.everstar.responsedto.EverStarPetSearchResponseDto;
import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.pet.repository.PetRepository;
import com.everstarbackmain.global.exception.CustomException;
import com.everstarbackmain.global.exception.ExceptionResponse;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class EverStarService {

	private final PetRepository petRepository;

	public EverStarPetInfoResponseDto getEverStarPetInfo(Long petId) {
		List<String> petPersonalities = petRepository.findPetPersonalitiesByIdAndIsDeleted(petId, false);
		Pet pet = petRepository.findByIdAndIsDeleted(petId, false)
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_PET_EXCEPTION));

		return EverStarPetInfoResponseDto.createEverStarPetInfoResponseDto(pet, petPersonalities);
	}

	public EverStarPetInfoResponseDto getRandomEverStarPetInfo(Long excludedPetId) {
		Long randomPetId = petRepository.findRandomActivePetIdExcluding(excludedPetId);

		if (randomPetId == null) {
			throw new ExceptionResponse(CustomException.NOT_FOUND_PET_EXCEPTION);
		}

		Pet randomPet = petRepository.findByIdAndIsDeleted(randomPetId, false)
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_PET_EXCEPTION));

		List<String> petPersonalities = petRepository.findPetPersonalitiesByIdAndIsDeleted(randomPetId, false);

		return EverStarPetInfoResponseDto.createEverStarPetInfoResponseDto(randomPet, petPersonalities);
	}

	public Page<EverStarPetSearchResponseDto> getPetSearchByName(String petName, Pageable pageable) {
		return petRepository.searchByPetName(petName, pageable);
	}
}
