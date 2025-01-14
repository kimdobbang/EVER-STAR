package com.everstarbackmain.domain.pet.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.everstarbackmain.domain.everstar.responsedto.EverStarPetSearchResponseDto;

public interface PetRepositoryCustom {

	List<String> findPetPersonalitiesByIdAndIsDeleted(Long petId, Boolean isDeleted);

	Long findRandomActivePetIdExcluding(Long excludedPetId);

	Page<EverStarPetSearchResponseDto> searchByPetName(String petName, Pageable pageable);
}
