package com.everstarbackmain.domain.userLetter.repository;

import java.util.List;

import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.userLetter.model.UserLetter;

public interface UserLetterRepositoryCustom {

	List<UserLetter> getUserLettersWithTimeRange(Pet pet);
}
