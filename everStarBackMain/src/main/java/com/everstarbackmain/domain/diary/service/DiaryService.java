package com.everstarbackmain.domain.diary.service;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.everstarbackmain.domain.diary.model.Diary;
import com.everstarbackmain.domain.diary.repository.DiaryRepository;
import com.everstarbackmain.domain.diary.requestDto.CreateDiaryRequestDto;
import com.everstarbackmain.domain.memorialBook.model.MemorialBook;
import com.everstarbackmain.domain.memorialBook.repository.MemorialBookRepository;
import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.global.exception.CustomException;
import com.everstarbackmain.global.exception.ExceptionResponse;
import com.everstarbackmain.global.security.auth.PrincipalDetails;
import com.everstarbackmain.global.util.S3UploadUtil;
import com.vane.badwordfiltering.BadWordFiltering;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j(topic = "elk")
public class DiaryService {

	private final DiaryRepository diaryRepository;
	private final MemorialBookRepository memorialBookRepository;
	private final S3UploadUtil s3UploadUtil;

	@Transactional
	public void createDiary(Authentication authentication, Long memorialBookId,
		CreateDiaryRequestDto createDiaryRequestDto, MultipartFile imageFile) {
		User user = ((PrincipalDetails)authentication.getPrincipal()).getUser();
		MemorialBook memorialBook = memorialBookRepository.findByIdAndIsDeleted(memorialBookId, false)
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_MEMORIAL_BOOK_EXCEPTION));

		if (!user.getId().equals(memorialBook.getPet().getUser().getId())) {
			throw new ExceptionResponse(CustomException.NOT_MY_MEMORIAL_BOOK_EXCEPTION);
		}

		if (!memorialBook.getIsActive()) {
			throw new ExceptionResponse(CustomException.NOT_ACTIVATED_MEMORIAL_BOOK_EXCEPTION);
		}

		String filteredTitle = filterBadWords(createDiaryRequestDto.getTitle());
		String filteredContent = filterBadWords(createDiaryRequestDto.getContent());

		if (imageFile != null && !imageFile.isEmpty()) {
			String imageUrl = s3UploadUtil.saveFile(imageFile);
			Diary diary = Diary.createDiaryHasImage(memorialBook, filteredTitle, filteredContent, imageUrl);
			diaryRepository.save(diary);
			return;
		}
		Diary diary = Diary.createDiaryHasNotImage(memorialBook, filteredTitle, filteredContent);
		diaryRepository.save(diary);
	}

	private String filterBadWords(String content) {
		BadWordFiltering badWordFiltering = new BadWordFiltering();
		return badWordFiltering.change(content, new String[] {"_", "-", "1", " ", ".", "@"});
	}
}
