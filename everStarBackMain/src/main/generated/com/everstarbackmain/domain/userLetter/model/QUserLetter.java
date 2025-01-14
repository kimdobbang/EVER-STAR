package com.everstarbackmain.domain.userLetter.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserLetter is a Querydsl query type for UserLetter
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUserLetter extends EntityPathBase<UserLetter> {

    private static final long serialVersionUID = -486061734L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUserLetter userLetter = new QUserLetter("userLetter");

    public final com.everstarbackmain.global.entity.QBaseTimeEntity _super = new com.everstarbackmain.global.entity.QBaseTimeEntity(this);

    public final StringPath content = createString("content");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdTime = _super.createdTime;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath imgUrl = createString("imgUrl");

    public final BooleanPath is_deleted = createBoolean("is_deleted");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastModifiedTime = _super.lastModifiedTime;

    public final com.everstarbackmain.domain.pet.model.QPet pet;

    public QUserLetter(String variable) {
        this(UserLetter.class, forVariable(variable), INITS);
    }

    public QUserLetter(Path<? extends UserLetter> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUserLetter(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUserLetter(PathMetadata metadata, PathInits inits) {
        this(UserLetter.class, metadata, inits);
    }

    public QUserLetter(Class<? extends UserLetter> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.pet = inits.isInitialized("pet") ? new com.everstarbackmain.domain.pet.model.QPet(forProperty("pet"), inits.get("pet")) : null;
    }

}

