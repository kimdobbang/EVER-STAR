package com.everstarbackmain.domain.diary.service;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.BDDMockito;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.multipart.MultipartFile;

import com.everstarbackmain.domain.diary.model.Diary;
import com.everstarbackmain.domain.diary.repository.DiaryRepository;
import com.everstarbackmain.domain.diary.requestDto.CreateDiaryRequestDto;
import com.everstarbackmain.domain.memorialBook.model.MemorialBook;
import com.everstarbackmain.domain.memorialBook.repository.MemorialBookRepository;
import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.pet.model.PetGender;
import com.everstarbackmain.domain.pet.requestdto.CreatePetRequestDto;
import com.everstarbackmain.domain.user.model.Gender;
import com.everstarbackmain.domain.user.model.Role;
import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.domain.user.requestDto.JoinRequestDto;
import com.everstarbackmain.global.exception.CustomException;
import com.everstarbackmain.global.exception.ExceptionResponse;
import com.everstarbackmain.global.security.auth.PrincipalDetails;
import com.everstarbackmain.global.util.S3UploadUtil;

@ExtendWith(MockitoExtension.class)
public class CreateDiaryServiceTest {

	@InjectMocks
	private DiaryService diaryService;

	@Mock
	private DiaryRepository diaryRepository;

	@Mock
	private MemorialBookRepository memorialBookRepository;

	@Mock
	private S3UploadUtil s3UploadUtil;

	@Mock
	private Authentication authentication;

	@Mock
	private PrincipalDetails principalDetails;

	private User user;
	private Pet pet;
	private MemorialBook memorialBook;
	private CreateDiaryRequestDto createDiaryRequestDto;

	@BeforeEach
	public void setup() {
		user = User.signUpUser(new JoinRequestDto("email", "password", "name", "010-1111-1111",
			LocalDate.now(), Gender.MALE, LocalTime.now(), Role.ROLE_USER));
		pet = Pet.createPet(user, new CreatePetRequestDto("petName", 10,
			LocalDate.of(1990, 1, 1), "species", PetGender.MALE,
			"relationship", List.of("개구쟁이", "귀염둥이")), "profileImageUrl");
		memorialBook = MemorialBook.createMemorialBook(pet);
		createDiaryRequestDto = new CreateDiaryRequestDto("title", "content");

		ReflectionTestUtils.setField(user, "id", 1L);
		ReflectionTestUtils.setField(pet, "id", 1L);
		ReflectionTestUtils.setField(memorialBook, "id", 1L);
	}

	@Test
	@DisplayName("다이어리_생성_성공_테스트")
	public void 다이어리_생성_성공_테스트() {
		// given
		memorialBook.changeActiveStatus();
		MultipartFile imageFile = Mockito.mock(MultipartFile.class);
		BDDMockito.given(memorialBookRepository.findByIdAndIsDeleted(anyLong(), anyBoolean())).willReturn(Optional.of(memorialBook));
		BDDMockito.given(authentication.getPrincipal()).willReturn(principalDetails);
		BDDMockito.given(principalDetails.getUser()).willReturn(user);

		// when
		diaryService.createDiary(authentication, 1L, createDiaryRequestDto, imageFile);

		// then
		BDDMockito.then(diaryRepository).should(times(1)).save(any(Diary.class));
		BDDMockito.then(s3UploadUtil).should(times(1)).saveFile(imageFile);
	}

	@Test
	@DisplayName("다이어리_생성_실패_존재하지_않는_메모리얼북_테스트")
	public void 다이어리_생성_실패_존재하지_않는_메모리얼북_테스트() {
		// given
		MultipartFile imageFile = Mockito.mock(MultipartFile.class);
		BDDMockito.given(memorialBookRepository.findByIdAndIsDeleted(anyLong(), anyBoolean())).willReturn(Optional.empty());
		BDDMockito.given(authentication.getPrincipal()).willReturn(principalDetails);
		BDDMockito.given(principalDetails.getUser()).willReturn(user);

		// when then
		Assertions.assertThatThrownBy(() -> diaryService.createDiary(authentication, 1L, createDiaryRequestDto, imageFile))
			.isInstanceOf(ExceptionResponse.class)
			.hasFieldOrPropertyWithValue("customException", CustomException.NOT_FOUND_MEMORIAL_BOOK_EXCEPTION);
	}

	@Test
	@DisplayName("다이어리_생성_실패_작성자가_메모리얼북_소유자가_아닌_경우_테스트")
	public void 다이어리_생성_실패_작성자가_메모리얼북_소유자가_아닌_경우_테스트() {
		// given
		User anotherUser = User.signUpUser(new JoinRequestDto("email2", "password", "name2", "010-2222-2222",
			LocalDate.now(), Gender.MALE, LocalTime.now(), Role.ROLE_USER));
		ReflectionTestUtils.setField(anotherUser, "id", 2L);
		MultipartFile imageFile = Mockito.mock(MultipartFile.class);

		BDDMockito.given(memorialBookRepository.findByIdAndIsDeleted(anyLong(), anyBoolean())).willReturn(Optional.of(memorialBook));
		BDDMockito.given(authentication.getPrincipal()).willReturn(principalDetails);
		BDDMockito.given(principalDetails.getUser()).willReturn(anotherUser);

		// when then
		Assertions.assertThatThrownBy(() -> diaryService.createDiary(authentication, 1L, createDiaryRequestDto, imageFile))
			.isInstanceOf(ExceptionResponse.class)
			.hasFieldOrPropertyWithValue("customException", CustomException.NOT_MY_MEMORIAL_BOOK_EXCEPTION);
	}

	@Test
	@DisplayName("다이어리_생성_실패_비활성화된_메모리얼북_테스트")
	public void 다이어리_생성_실패_비활성화된_메모리얼북_테스트() {
		// given
		ReflectionTestUtils.setField(memorialBook, "isActive", false);
		MultipartFile imageFile = Mockito.mock(MultipartFile.class);

		BDDMockito.given(memorialBookRepository.findByIdAndIsDeleted(anyLong(), anyBoolean())).willReturn(Optional.of(memorialBook));
		BDDMockito.given(authentication.getPrincipal()).willReturn(principalDetails);
		BDDMockito.given(principalDetails.getUser()).willReturn(user);

		// when then
		Assertions.assertThatThrownBy(() -> diaryService.createDiary(authentication, 1L, createDiaryRequestDto, imageFile))
			.isInstanceOf(ExceptionResponse.class)
			.hasFieldOrPropertyWithValue("customException", CustomException.NOT_ACTIVATED_MEMORIAL_BOOK_EXCEPTION);
	}
}
