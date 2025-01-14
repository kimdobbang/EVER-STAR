package com.everstarbackmain.domain.pet.repository;

import java.util.List;

public interface PetPersonalityRepositoryCustom {

	List<String> findPersonalityValuesByPetIdAndIsDeleted(Long petId, Boolean isDeleted);
}
