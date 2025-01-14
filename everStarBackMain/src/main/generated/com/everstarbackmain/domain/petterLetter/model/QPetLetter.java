package com.everstarbackmain.domain.petterLetter.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPetLetter is a Querydsl query type for PetLetter
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPetLetter extends EntityPathBase<PetLetter> {

    private static final long serialVersionUID = -2141293357L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPetLetter petLetter = new QPetLetter("petLetter");

    public final com.everstarbackmain.global.entity.QBaseTimeEntity _super = new com.everstarbackmain.global.entity.QBaseTimeEntity(this);

    public final StringPath content = createString("content");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdTime = _super.createdTime;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final BooleanPath isDeleted = createBoolean("isDeleted");

    public final BooleanPath isRead = createBoolean("isRead");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastModifiedTime = _super.lastModifiedTime;

    public final com.everstarbackmain.domain.pet.model.QPet pet;

    public final EnumPath<SendType> sendType = createEnum("sendType", SendType.class);

    public final com.everstarbackmain.domain.userLetter.model.QUserLetter userLetter;

    public QPetLetter(String variable) {
        this(PetLetter.class, forVariable(variable), INITS);
    }

    public QPetLetter(Path<? extends PetLetter> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPetLetter(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPetLetter(PathMetadata metadata, PathInits inits) {
        this(PetLetter.class, metadata, inits);
    }

    public QPetLetter(Class<? extends PetLetter> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.pet = inits.isInitialized("pet") ? new com.everstarbackmain.domain.pet.model.QPet(forProperty("pet"), inits.get("pet")) : null;
        this.userLetter = inits.isInitialized("userLetter") ? new com.everstarbackmain.domain.userLetter.model.QUserLetter(forProperty("userLetter"), inits.get("userLetter")) : null;
    }

}

