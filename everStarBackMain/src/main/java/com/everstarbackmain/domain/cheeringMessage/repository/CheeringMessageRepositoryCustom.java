package com.everstarbackmain.domain.cheeringMessage.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.everstarbackmain.domain.cheeringMessage.responseDto.CheeringMessageResponseDto;
import com.everstarbackmain.domain.pet.model.Pet;

public interface CheeringMessageRepositoryCustom {

	Page<CheeringMessageResponseDto> findCheeringMessagesByPetId(Pet petId, Pageable pageable);
}
