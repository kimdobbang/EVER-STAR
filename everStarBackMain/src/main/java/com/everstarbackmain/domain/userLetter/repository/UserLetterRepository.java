package com.everstarbackmain.domain.userLetter.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.userLetter.model.UserLetter;

@Repository
public interface UserLetterRepository extends JpaRepository<UserLetter, Long>, UserLetterRepositoryCustom {

	@Override
	List<UserLetter> getUserLettersWithTimeRange(Pet pet);
}
