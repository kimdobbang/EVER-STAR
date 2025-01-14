package com.everstarbackmain.domain.petterLetter.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.everstarbackmain.domain.petterLetter.responsedto.PetLetterResponseDto;
import com.everstarbackmain.domain.user.model.User;

public interface PetLetterRepositoryCustom {

	Page<PetLetterResponseDto> findPetLettersByPetId(User user, Long petId, Pageable pageable);
}
