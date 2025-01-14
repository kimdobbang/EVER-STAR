package com.everstarbackmain.domain.cheeringMessage.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCheeringMessage is a Querydsl query type for CheeringMessage
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCheeringMessage extends EntityPathBase<CheeringMessage> {

    private static final long serialVersionUID = -67560424L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCheeringMessage cheeringMessage = new QCheeringMessage("cheeringMessage");

    public final com.everstarbackmain.global.entity.QBaseTimeEntity _super = new com.everstarbackmain.global.entity.QBaseTimeEntity(this);

    public final StringPath behindPetName = createString("behindPetName");

    public final StringPath behindPetRelationship = createString("behindPetRelationship");

    public final EnumPath<Color> color = createEnum("color", Color.class);

    public final StringPath content = createString("content");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdTime = _super.createdTime;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final BooleanPath isAnonymous = createBoolean("isAnonymous");

    public final BooleanPath isDeleted = createBoolean("isDeleted");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastModifiedTime = _super.lastModifiedTime;

    public final com.everstarbackmain.domain.pet.model.QPet pet;

    public QCheeringMessage(String variable) {
        this(CheeringMessage.class, forVariable(variable), INITS);
    }

    public QCheeringMessage(Path<? extends CheeringMessage> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCheeringMessage(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCheeringMessage(PathMetadata metadata, PathInits inits) {
        this(CheeringMessage.class, metadata, inits);
    }

    public QCheeringMessage(Class<? extends CheeringMessage> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.pet = inits.isInitialized("pet") ? new com.everstarbackmain.domain.pet.model.QPet(forProperty("pet"), inits.get("pet")) : null;
    }

}

