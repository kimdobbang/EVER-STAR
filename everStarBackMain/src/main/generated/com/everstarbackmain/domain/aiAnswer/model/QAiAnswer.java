package com.everstarbackmain.domain.aiAnswer.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAiAnswer is a Querydsl query type for AiAnswer
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAiAnswer extends EntityPathBase<AiAnswer> {

    private static final long serialVersionUID = 162450618L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QAiAnswer aiAnswer = new QAiAnswer("aiAnswer");

    public final com.everstarbackmain.global.entity.QBaseTimeEntity _super = new com.everstarbackmain.global.entity.QBaseTimeEntity(this);

    public final StringPath content = createString("content");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdTime = _super.createdTime;

    public final QAiAnswerId id;

    public final StringPath imageUrl = createString("imageUrl");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastModifiedTime = _super.lastModifiedTime;

    public final com.everstarbackmain.domain.pet.model.QPet pet;

    public final com.everstarbackmain.domain.quest.model.QQuest quest;

    public final EnumPath<AiAnswerType> type = createEnum("type", AiAnswerType.class);

    public QAiAnswer(String variable) {
        this(AiAnswer.class, forVariable(variable), INITS);
    }

    public QAiAnswer(Path<? extends AiAnswer> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QAiAnswer(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QAiAnswer(PathMetadata metadata, PathInits inits) {
        this(AiAnswer.class, metadata, inits);
    }

    public QAiAnswer(Class<? extends AiAnswer> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.id = inits.isInitialized("id") ? new QAiAnswerId(forProperty("id")) : null;
        this.pet = inits.isInitialized("pet") ? new com.everstarbackmain.domain.pet.model.QPet(forProperty("pet"), inits.get("pet")) : null;
        this.quest = inits.isInitialized("quest") ? new com.everstarbackmain.domain.quest.model.QQuest(forProperty("quest")) : null;
    }

}

