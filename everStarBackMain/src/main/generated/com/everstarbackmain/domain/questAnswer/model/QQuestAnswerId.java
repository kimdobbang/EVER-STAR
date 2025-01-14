package com.everstarbackmain.domain.questAnswer.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QQuestAnswerId is a Querydsl query type for QuestAnswerId
 */
@Generated("com.querydsl.codegen.DefaultEmbeddableSerializer")
public class QQuestAnswerId extends BeanPath<QuestAnswerId> {

    private static final long serialVersionUID = 187850799L;

    public static final QQuestAnswerId questAnswerId = new QQuestAnswerId("questAnswerId");

    public final NumberPath<Long> petId = createNumber("petId", Long.class);

    public final NumberPath<Long> questId = createNumber("questId", Long.class);

    public QQuestAnswerId(String variable) {
        super(QuestAnswerId.class, forVariable(variable));
    }

    public QQuestAnswerId(Path<? extends QuestAnswerId> path) {
        super(path.getType(), path.getMetadata());
    }

    public QQuestAnswerId(PathMetadata metadata) {
        super(QuestAnswerId.class, metadata);
    }

}

