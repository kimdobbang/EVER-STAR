package com.everstarbackmain.domain.userLetter.repository;

import java.util.List;

import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.userLetter.model.QUserLetter;
import com.everstarbackmain.domain.userLetter.model.UserLetter;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class UserLetterRepositoryImpl implements UserLetterRepositoryCustom {

	private final JPAQueryFactory queryFactory;
	private QUserLetter userLetter = QUserLetter.userLetter;

	@Override
	public List<UserLetter> getUserLettersWithTimeRange(Pet pet) {
		return queryFactory.select(userLetter)
			.from(userLetter)
			.where(userLetter.createdTime.between(pet.getLastAccessTime(), pet.getSendLetterTime())
				.and(userLetter.pet.eq(pet)))
			.fetch();
	}
}
