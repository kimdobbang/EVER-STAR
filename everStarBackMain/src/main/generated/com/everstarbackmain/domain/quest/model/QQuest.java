package com.everstarbackmain.domain.quest.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QQuest is a Querydsl query type for Quest
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QQuest extends EntityPathBase<Quest> {

    private static final long serialVersionUID = -1915653000L;

    public static final QQuest quest = new QQuest("quest");

    public final StringPath content = createString("content");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final EnumPath<QuestType> type = createEnum("type", QuestType.class);

    public QQuest(String variable) {
        super(Quest.class, forVariable(variable));
    }

    public QQuest(Path<? extends Quest> path) {
        super(path.getType(), path.getMetadata());
    }

    public QQuest(PathMetadata metadata) {
        super(Quest.class, metadata);
    }

}

