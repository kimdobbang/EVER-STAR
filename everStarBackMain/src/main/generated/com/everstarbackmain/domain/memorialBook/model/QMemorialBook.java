package com.everstarbackmain.domain.memorialBook.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMemorialBook is a Querydsl query type for MemorialBook
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMemorialBook extends EntityPathBase<MemorialBook> {

    private static final long serialVersionUID = 1533727962L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMemorialBook memorialBook = new QMemorialBook("memorialBook");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final BooleanPath isActive = createBoolean("isActive");

    public final BooleanPath isDeleted = createBoolean("isDeleted");

    public final BooleanPath isOpen = createBoolean("isOpen");

    public final BooleanPath isTested = createBoolean("isTested");

    public final com.everstarbackmain.domain.pet.model.QPet pet;

    public final StringPath psychologicalTestResult = createString("psychologicalTestResult");

    public QMemorialBook(String variable) {
        this(MemorialBook.class, forVariable(variable), INITS);
    }

    public QMemorialBook(Path<? extends MemorialBook> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMemorialBook(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMemorialBook(PathMetadata metadata, PathInits inits) {
        this(MemorialBook.class, metadata, inits);
    }

    public QMemorialBook(Class<? extends MemorialBook> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.pet = inits.isInitialized("pet") ? new com.everstarbackmain.domain.pet.model.QPet(forProperty("pet"), inits.get("pet")) : null;
    }

}

