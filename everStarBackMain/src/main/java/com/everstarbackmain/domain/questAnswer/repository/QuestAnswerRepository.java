package com.everstarbackmain.domain.questAnswer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.everstarbackmain.domain.questAnswer.model.QuestAnswer;

public interface QuestAnswerRepository extends JpaRepository<QuestAnswer, Long>, QuestAnswerCustomRepository {

	List<QuestAnswer> findByPetIdAndIsDeleted(Long petId, Boolean isDeleted);
}
