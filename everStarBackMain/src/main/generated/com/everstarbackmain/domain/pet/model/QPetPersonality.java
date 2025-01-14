package com.everstarbackmain.domain.pet.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPetPersonality is a Querydsl query type for PetPersonality
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPetPersonality extends EntityPathBase<PetPersonality> {

    private static final long serialVersionUID = 1694238492L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPetPersonality petPersonality = new QPetPersonality("petPersonality");

    public final com.everstarbackmain.global.entity.QBaseTimeEntity _super = new com.everstarbackmain.global.entity.QBaseTimeEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdTime = _super.createdTime;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final BooleanPath isDeleted = createBoolean("isDeleted");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastModifiedTime = _super.lastModifiedTime;

    public final StringPath personalityValue = createString("personalityValue");

    public final QPet pet;

    public QPetPersonality(String variable) {
        this(PetPersonality.class, forVariable(variable), INITS);
    }

    public QPetPersonality(Path<? extends PetPersonality> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPetPersonality(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPetPersonality(PathMetadata metadata, PathInits inits) {
        this(PetPersonality.class, metadata, inits);
    }

    public QPetPersonality(Class<? extends PetPersonality> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.pet = inits.isInitialized("pet") ? new QPet(forProperty("pet"), inits.get("pet")) : null;
    }

}

