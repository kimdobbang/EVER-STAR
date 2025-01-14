package com.everstarbackmain.domain.cheeringMessage.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import com.everstarbackmain.domain.cheeringMessage.model.QCheeringMessage;
import com.everstarbackmain.domain.cheeringMessage.responseDto.CheeringMessageResponseDto;
import com.everstarbackmain.domain.pet.model.Pet;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CheeringMessageRepositoryImpl implements CheeringMessageRepositoryCustom {

	private final JPAQueryFactory jpaQueryFactory;
	private QCheeringMessage cheeringMessage = QCheeringMessage.cheeringMessage;

	@Override
	public Page<CheeringMessageResponseDto> findCheeringMessagesByPetId(Pet pet, Pageable pageable) {
		List<CheeringMessageResponseDto> cheeringMessages = jpaQueryFactory
			.select(
				Projections.constructor(CheeringMessageResponseDto.class, cheeringMessage.id, cheeringMessage.content,
					cheeringMessage.isAnonymous, cheeringMessage.behindPetRelationship, cheeringMessage.behindPetName,
					cheeringMessage.color))
			.from(cheeringMessage)
			.where(cheeringMessage.pet.eq(pet).and(cheeringMessage.isDeleted.isFalse()))
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.fetch();

		long total = jpaQueryFactory
			.selectFrom(cheeringMessage)
			.where(cheeringMessage.pet.eq(pet).and(cheeringMessage.isDeleted.isFalse()))
			.fetchCount();

		return new PageImpl<>(cheeringMessages, pageable, total);
	}
}
