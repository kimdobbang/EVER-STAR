package com.everstarbackmain.domain.questAnswer.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QQuestAnswer is a Querydsl query type for QuestAnswer
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QQuestAnswer extends EntityPathBase<QuestAnswer> {

    private static final long serialVersionUID = 2114159604L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QQuestAnswer questAnswer = new QQuestAnswer("questAnswer");

    public final com.everstarbackmain.global.entity.QBaseTimeEntity _super = new com.everstarbackmain.global.entity.QBaseTimeEntity(this);

    public final StringPath content = createString("content");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdTime = _super.createdTime;

    public final QQuestAnswerId id;

    public final StringPath imageUrl = createString("imageUrl");

    public final BooleanPath isDeleted = createBoolean("isDeleted");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastModifiedTime = _super.lastModifiedTime;

    public final com.everstarbackmain.domain.pet.model.QPet pet;

    public final com.everstarbackmain.domain.quest.model.QQuest quest;

    public final EnumPath<QuestAnswerType> type = createEnum("type", QuestAnswerType.class);

    public QQuestAnswer(String variable) {
        this(QuestAnswer.class, forVariable(variable), INITS);
    }

    public QQuestAnswer(Path<? extends QuestAnswer> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QQuestAnswer(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QQuestAnswer(PathMetadata metadata, PathInits inits) {
        this(QuestAnswer.class, metadata, inits);
    }

    public QQuestAnswer(Class<? extends QuestAnswer> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.id = inits.isInitialized("id") ? new QQuestAnswerId(forProperty("id")) : null;
        this.pet = inits.isInitialized("pet") ? new com.everstarbackmain.domain.pet.model.QPet(forProperty("pet"), inits.get("pet")) : null;
        this.quest = inits.isInitialized("quest") ? new com.everstarbackmain.domain.quest.model.QQuest(forProperty("quest")) : null;
    }

}

