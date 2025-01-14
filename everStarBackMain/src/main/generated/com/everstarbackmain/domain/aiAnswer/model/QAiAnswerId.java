package com.everstarbackmain.domain.aiAnswer.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QAiAnswerId is a Querydsl query type for AiAnswerId
 */
@Generated("com.querydsl.codegen.DefaultEmbeddableSerializer")
public class QAiAnswerId extends BeanPath<AiAnswerId> {

    private static final long serialVersionUID = 1496223605L;

    public static final QAiAnswerId aiAnswerId = new QAiAnswerId("aiAnswerId");

    public final NumberPath<Long> petId = createNumber("petId", Long.class);

    public final NumberPath<Long> questId = createNumber("questId", Long.class);

    public QAiAnswerId(String variable) {
        super(AiAnswerId.class, forVariable(variable));
    }

    public QAiAnswerId(Path<? extends AiAnswerId> path) {
        super(path.getType(), path.getMetadata());
    }

    public QAiAnswerId(PathMetadata metadata) {
        super(AiAnswerId.class, metadata);
    }

}

