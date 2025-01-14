package com.everstarbackmain.domain.questAnswer.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.everstarbackmain.domain.questAnswer.model.QQuestAnswer;
import com.querydsl.jpa.impl.JPAQueryFactory;

@Repository
public class QuestAnswerCustomRepositoryImpl implements QuestAnswerCustomRepository {

	private final JPAQueryFactory queryFactory;

	public QuestAnswerCustomRepositoryImpl(JPAQueryFactory queryFactory) {
		this.queryFactory = queryFactory;
	}

	@Override
	public List<String> findContentByPetIdAndSpecificQuestIdsAndIsDeleted(Long petId, Integer firstQuestId,
		Integer secondQuestId, boolean isDeleted) {
		QQuestAnswer questAnswer = QQuestAnswer.questAnswer;
		return queryFactory.select(questAnswer.content)
			.from(questAnswer)
			.where(questAnswer.pet.id.eq(petId)
				.and(questAnswer.quest.id.in(firstQuestId, secondQuestId))
				.and(questAnswer.isDeleted.eq(isDeleted)))
			.fetch();
	}
}
