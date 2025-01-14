package com.everstarbackmain.domain.pet.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPet is a Querydsl query type for Pet
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPet extends EntityPathBase<Pet> {

    private static final long serialVersionUID = 5595122L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPet pet = new QPet("pet");

    public final com.everstarbackmain.global.entity.QBaseTimeEntity _super = new com.everstarbackmain.global.entity.QBaseTimeEntity(this);

    public final NumberPath<Integer> age = createNumber("age", Integer.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdTime = _super.createdTime;

    public final EnumPath<PetGender> gender = createEnum("gender", PetGender.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath introduction = createString("introduction");

    public final BooleanPath isDeleted = createBoolean("isDeleted");

    public final BooleanPath isQuestCompleted = createBoolean("isQuestCompleted");

    public final DateTimePath<java.time.LocalDateTime> lastAccessTime = createDateTime("lastAccessTime", java.time.LocalDateTime.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastModifiedTime = _super.lastModifiedTime;

    public final DateTimePath<java.time.LocalDateTime> lastSendLetterTime = createDateTime("lastSendLetterTime", java.time.LocalDateTime.class);

    public final DatePath<java.time.LocalDate> memorialDate = createDate("memorialDate", java.time.LocalDate.class);

    public final StringPath name = createString("name");

    public final StringPath profileImageUrl = createString("profileImageUrl");

    public final NumberPath<Integer> questIndex = createNumber("questIndex", Integer.class);

    public final StringPath relationship = createString("relationship");

    public final DateTimePath<java.time.LocalDateTime> sendLetterTime = createDateTime("sendLetterTime", java.time.LocalDateTime.class);

    public final StringPath species = createString("species");

    public final com.everstarbackmain.domain.user.model.QUser user;

    public QPet(String variable) {
        this(Pet.class, forVariable(variable), INITS);
    }

    public QPet(Path<? extends Pet> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPet(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPet(PathMetadata metadata, PathInits inits) {
        this(Pet.class, metadata, inits);
    }

    public QPet(Class<? extends Pet> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new com.everstarbackmain.domain.user.model.QUser(forProperty("user")) : null;
    }

}

