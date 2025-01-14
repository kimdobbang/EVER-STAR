package com.everstarbackmain.domain.diary.model;

import com.everstarbackmain.domain.memorialBook.model.MemorialBook;
import com.everstarbackmain.global.entity.BaseTimeEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "diary")
public class Diary extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "memorial_book_id")
	private MemorialBook memorialBook;

	@Column(nullable = false)
	private String title;

	@Column(nullable = false)
	private String content;

	private String imageUrl;

	@Column(nullable = false)
	private Boolean isDeleted;

	@Builder
	private Diary(MemorialBook memorialBook, String title, String content, String imageUrl) {
		this.memorialBook = memorialBook;
		this.title = title;
		this.content = content;
		this.imageUrl = imageUrl;
		isDeleted = false;
	}

	public static Diary createDiaryHasImage(MemorialBook memorialBook, String filteredTitle, String filteredContent, String imageUrl) {
		return Diary.builder()
			.memorialBook(memorialBook)
			.title(filteredTitle)
			.content(filteredContent)
			.imageUrl(imageUrl)
			.build();
	}

	public static Diary createDiaryHasNotImage(MemorialBook memorialBook, String filteredTitle, String filteredContent) {
		return Diary.builder()
			.memorialBook(memorialBook)
			.title(filteredTitle)
			.content(filteredContent)
			.build();
	}
}
