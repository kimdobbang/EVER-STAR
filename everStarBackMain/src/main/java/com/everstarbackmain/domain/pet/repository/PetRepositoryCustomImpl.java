package com.everstarbackmain.domain.pet.repository;

import com.everstarbackmain.domain.everstar.responsedto.EverStarPetSearchResponseDto;
import com.everstarbackmain.domain.pet.model.QPet;
import com.everstarbackmain.domain.pet.model.QPetPersonality;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class PetRepositoryCustomImpl implements PetRepositoryCustom {

	private final JPAQueryFactory queryFactory;
	private QPet pet = QPet.pet;

	@Override
	public List<String> findPetPersonalitiesByIdAndIsDeleted(Long petId, Boolean isDeleted) {
		QPetPersonality petPersonality = QPetPersonality.petPersonality;
		return queryFactory
			.select(petPersonality.personalityValue)
			.from(petPersonality)
			.where(petPersonality.pet.id.eq(petId)
				.and(petPersonality.isDeleted.eq(isDeleted)))
			.fetch();
	}

	@Override
	public Long findRandomActivePetIdExcluding(Long excludedPetId) {
		QPet pet = QPet.pet;

		List<Long> petIds = queryFactory
			.select(pet.id)
			.from(pet)
			.where(pet.isDeleted.eq(false)
				.and(pet.id.ne(excludedPetId)))
			.fetch();

		if (petIds.isEmpty()) {
			return null;
		}

		return petIds.get(ThreadLocalRandom.current().nextInt(petIds.size()));
	}

	@Override
	public Page<EverStarPetSearchResponseDto> searchByPetName(String petName, Pageable pageable) {
		List<EverStarPetSearchResponseDto> searchPets = queryFactory
			.select(Projections.constructor(EverStarPetSearchResponseDto.class, pet.id, pet.name, pet.user.userName,
				pet.user.email))
			.from(pet)
			.where(pet.name.like(petName + "%").and(pet.isDeleted.isFalse()))
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.fetch();

		long total = queryFactory
			.selectFrom(pet)
			.where(pet.name.eq(petName + "%").and(pet.isDeleted.isFalse()))
			.fetchCount();

		return new PageImpl<>(searchPets, pageable, total);
	}
}
