package com.everstarbackmain.domain.everstar.responsedto;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.processing.Generated;

/**
 * com.everstarbackmain.domain.everstar.responsedto.QEverStarPetSearchResponseDto is a Querydsl Projection type for EverStarPetSearchResponseDto
 */
@Generated("com.querydsl.codegen.DefaultProjectionSerializer")
public class QEverStarPetSearchResponseDto extends ConstructorExpression<EverStarPetSearchResponseDto> {

    private static final long serialVersionUID = -2130623492L;

    public QEverStarPetSearchResponseDto(com.querydsl.core.types.Expression<Long> id, com.querydsl.core.types.Expression<String> petName, com.querydsl.core.types.Expression<String> userName, com.querydsl.core.types.Expression<String> email) {
        super(EverStarPetSearchResponseDto.class, new Class<?>[]{long.class, String.class, String.class, String.class}, id, petName, userName, email);
    }

}

