package com.everstarbackmain.domain.diary.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QDiary is a Querydsl query type for Diary
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QDiary extends EntityPathBase<Diary> {

    private static final long serialVersionUID = 1088536762L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QDiary diary = new QDiary("diary");

    public final com.everstarbackmain.global.entity.QBaseTimeEntity _super = new com.everstarbackmain.global.entity.QBaseTimeEntity(this);

    public final StringPath content = createString("content");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdTime = _super.createdTime;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath imageUrl = createString("imageUrl");

    public final BooleanPath isDeleted = createBoolean("isDeleted");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastModifiedTime = _super.lastModifiedTime;

    public final com.everstarbackmain.domain.memorialBook.model.QMemorialBook memorialBook;

    public final StringPath title = createString("title");

    public QDiary(String variable) {
        this(Diary.class, forVariable(variable), INITS);
    }

    public QDiary(Path<? extends Diary> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QDiary(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QDiary(PathMetadata metadata, PathInits inits) {
        this(Diary.class, metadata, inits);
    }

    public QDiary(Class<? extends Diary> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.memorialBook = inits.isInitialized("memorialBook") ? new com.everstarbackmain.domain.memorialBook.model.QMemorialBook(forProperty("memorialBook"), inits.get("memorialBook")) : null;
    }

}

