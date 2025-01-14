package com.everstarbackmain.domain.pet.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.everstarbackmain.domain.pet.model.QPetPersonality;
import com.querydsl.jpa.impl.JPAQueryFactory;

@Repository

public class PetPersonalityRepositoryCustomImpl implements PetPersonalityRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	public PetPersonalityRepositoryCustomImpl(JPAQueryFactory queryFactory) {
		this.queryFactory = queryFactory;
	}

	@Override
	public List<String> findPersonalityValuesByPetIdAndIsDeleted(Long petId, Boolean isDeleted) {
		QPetPersonality petPersonality = QPetPersonality.petPersonality;
		return queryFactory
			.select(petPersonality.personalityValue)
			.from(petPersonality)
			.where(petPersonality.pet.id.eq(petId)
				.and(petPersonality.isDeleted.eq(isDeleted)))
			.fetch();
	}
}
