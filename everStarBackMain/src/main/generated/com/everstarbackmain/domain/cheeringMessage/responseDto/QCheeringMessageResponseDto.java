package com.everstarbackmain.domain.cheeringMessage.responseDto;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.processing.Generated;

/**
 * com.everstarbackmain.domain.cheeringMessage.responseDto.QCheeringMessageResponseDto is a Querydsl Projection type for CheeringMessageResponseDto
 */
@Generated("com.querydsl.codegen.DefaultProjectionSerializer")
public class QCheeringMessageResponseDto extends ConstructorExpression<CheeringMessageResponseDto> {

    private static final long serialVersionUID = -353815791L;

    public QCheeringMessageResponseDto(com.querydsl.core.types.Expression<Long> cheeringMessageId, com.querydsl.core.types.Expression<String> content, com.querydsl.core.types.Expression<Boolean> isAnonymous, com.querydsl.core.types.Expression<String> relationShip, com.querydsl.core.types.Expression<String> petName, com.querydsl.core.types.Expression<com.everstarbackmain.domain.cheeringMessage.model.Color> color) {
        super(CheeringMessageResponseDto.class, new Class<?>[]{long.class, String.class, boolean.class, String.class, String.class, com.everstarbackmain.domain.cheeringMessage.model.Color.class}, cheeringMessageId, content, isAnonymous, relationShip, petName, color);
    }

}

