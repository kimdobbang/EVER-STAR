package com.everstarbackmain.domain.sentimentAnalysis.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QSentimentAnalysis is a Querydsl query type for SentimentAnalysis
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QSentimentAnalysis extends EntityPathBase<SentimentAnalysis> {

    private static final long serialVersionUID = -749267574L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QSentimentAnalysis sentimentAnalysis = new QSentimentAnalysis("sentimentAnalysis");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.everstarbackmain.domain.pet.model.QPet pet;

    public final StringPath totalResult = createString("totalResult");

    public final NumberPath<Double> week1Result = createNumber("week1Result", Double.class);

    public final NumberPath<Double> week2Result = createNumber("week2Result", Double.class);

    public final NumberPath<Double> week3Result = createNumber("week3Result", Double.class);

    public final NumberPath<Double> week4Result = createNumber("week4Result", Double.class);

    public final NumberPath<Double> week5Result = createNumber("week5Result", Double.class);

    public final NumberPath<Double> week6Result = createNumber("week6Result", Double.class);

    public final NumberPath<Double> week7Result = createNumber("week7Result", Double.class);

    public QSentimentAnalysis(String variable) {
        this(SentimentAnalysis.class, forVariable(variable), INITS);
    }

    public QSentimentAnalysis(Path<? extends SentimentAnalysis> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QSentimentAnalysis(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QSentimentAnalysis(PathMetadata metadata, PathInits inits) {
        this(SentimentAnalysis.class, metadata, inits);
    }

    public QSentimentAnalysis(Class<? extends SentimentAnalysis> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.pet = inits.isInitialized("pet") ? new com.everstarbackmain.domain.pet.model.QPet(forProperty("pet"), inits.get("pet")) : null;
    }

}

