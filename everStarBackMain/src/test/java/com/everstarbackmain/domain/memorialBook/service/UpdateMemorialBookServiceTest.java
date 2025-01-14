package com.everstarbackmain.domain.memorialBook.service;

import static org.mockito.ArgumentMatchers.*;

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
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.test.util.ReflectionTestUtils;

import com.everstarbackmain.domain.memorialBook.message.PsychologicalTestResultMessage;
import com.everstarbackmain.domain.memorialBook.model.MemorialBook;
import com.everstarbackmain.domain.memorialBook.repository.MemorialBookRepository;
import com.everstarbackmain.domain.memorialBook.requestdto.MemorialBookTestResultRequestDto;
import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.pet.model.PetGender;
import com.everstarbackmain.domain.pet.repository.PetRepository;
import com.everstarbackmain.domain.pet.requestdto.CreatePetRequestDto;
import com.everstarbackmain.domain.user.model.Gender;
import com.everstarbackmain.domain.user.model.Role;
import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.domain.user.requestDto.JoinRequestDto;
import com.everstarbackmain.global.exception.CustomException;
import com.everstarbackmain.global.exception.ExceptionResponse;
import com.everstarbackmain.global.security.auth.PrincipalDetails;

@ExtendWith(MockitoExtension.class)
class UpdateMemorialBookServiceTest {

	@InjectMocks
	private MemorialBookService memorialBookService;

	@Mock
	private MemorialBookRepository memorialBookRepository;

	@Mock
	private PetRepository petRepository;

	@Mock
	private Authentication authentication;

	@Mock
	private PrincipalDetails principalDetails;

	private User user;
	private Pet pet;
	private MemorialBook memorialBook;

	@BeforeEach
	public void setup() {
		user = User.signUpUser(new JoinRequestDto("email", "password", "name", "010-1111-1111",
			LocalDate.now(), Gender.MALE, LocalTime.now(), Role.ROLE_USER));
		pet = Pet.createPet(user, new CreatePetRequestDto("petName", 10,
			LocalDate.of(1990, 1, 1), "species", PetGender.MALE,
			"relationship", List.of("개구쟁이", "귀염둥이")), "profileImageUrl");
		memorialBook = MemorialBook.createMemorialBook(pet);
		memorialBook.changeActiveStatus();

		ReflectionTestUtils.setField(user, "id", 1L);
		ReflectionTestUtils.setField(pet, "id", 1L);
	}

	@Test
	@DisplayName("메모리얼북_공개_여부_수정_성공_테스트")
	public void 메모리얼북_공개_여부_수정_성공_테스트() {
		// given
		BDDMockito.given(memorialBookRepository.findByIdAndIsDeleted(anyLong(), anyBoolean())).willReturn(Optional.of(memorialBook));

		// when
		Assertions.assertThatNoException().isThrownBy(() -> memorialBookService.changeOpenStatus(1L));

		// then
		Assertions.assertThat(memorialBook.getIsOpen()).isTrue();
	}

	@Test
	@DisplayName("메모리얼북_공개_여부_수정_비활성화_에러_테스트")
	public void 메모리얼북_공개_여부_수정_비활성화_에러_테스트() {
		// given
		ReflectionTestUtils.setField(memorialBook, "isActive", false);

		BDDMockito.given(memorialBookRepository.findByIdAndIsDeleted(anyLong(), anyBoolean())).willReturn(Optional.of(memorialBook));

		// then
		Assertions.assertThatThrownBy(() -> memorialBookService.changeOpenStatus(1L))
			.isInstanceOf(ExceptionResponse.class)
			.hasFieldOrPropertyWithValue("customException", CustomException.NOT_ACTIVATED_MEMORIAL_BOOK_EXCEPTION);
	}

	@Test
	@DisplayName("메모리얼북_공개_여부_수정_NOT_FOUND_에러_테스트")
	public void 메모리얼북_공개_여부_수정_NOT_FOUND_에러_테스트() {
		// given
		BDDMockito.given(memorialBookRepository.findByIdAndIsDeleted(anyLong(), anyBoolean())).willReturn(Optional.empty());

		// then
		Assertions.assertThatThrownBy(() -> memorialBookService.changeOpenStatus(1L))
			.isInstanceOf(ExceptionResponse.class)
			.hasFieldOrPropertyWithValue("customException", CustomException.NOT_FOUND_MEMORIAL_BOOK_EXCEPTION);
	}

	@Test
	@DisplayName("심리_검사_결과_추가_성공_테스트")
	public void 심리_검사_결과_추가_성공_테스트() {
		// given
		BDDMockito.given(memorialBookRepository.findByIdAndIsDeleted(anyLong(), anyBoolean())).willReturn(Optional.of(memorialBook));
		BDDMockito.given(petRepository.findByIdAndIsDeleted(anyLong(), anyBoolean())).willReturn(Optional.of(pet));
		BDDMockito.given(authentication.getPrincipal()).willReturn(principalDetails);
		BDDMockito.given(principalDetails.getUser()).willReturn(user);
		MemorialBookTestResultRequestDto requestDto = new MemorialBookTestResultRequestDto(2);

		// when
		Assertions.assertThatNoException().isThrownBy(() -> memorialBookService.addPsychologicalTestResult(
			authentication, 1L, 1L, requestDto));

		// then
		Assertions.assertThat(memorialBook.getPsychologicalTestResult())
			.isEqualTo(PsychologicalTestResultMessage.NORMAL.getMessage());
	}

	@Test
	@DisplayName("존재하지_않는_메모리얼북_심리_검사_결과_추가_에러_테스트")
	public void 존재하지_않는_메모리얼북_심리_검사_결과_추가_에러_테스트() {
		// given
		BDDMockito.given(memorialBookRepository.findByIdAndIsDeleted(anyLong(), anyBoolean())).willReturn(Optional.empty());
		BDDMockito.given(authentication.getPrincipal()).willReturn(principalDetails);
		BDDMockito.given(principalDetails.getUser()).willReturn(user);
		MemorialBookTestResultRequestDto requestDto = new MemorialBookTestResultRequestDto(10);

		// then
		Assertions.assertThatThrownBy(() -> memorialBookService.addPsychologicalTestResult(
				authentication, 1L, 2L, requestDto))
			.isInstanceOf(ExceptionResponse.class)
			.hasFieldOrPropertyWithValue("customException", CustomException.NOT_FOUND_MEMORIAL_BOOK_EXCEPTION);
	}

	@Test
	@DisplayName("잘못된_심리_검사_결과_추가_에러_테스트")
	public void 잘못된_심리_검사_결과_추가_에러_테스트() {
		// given
		BDDMockito.given(memorialBookRepository.findByIdAndIsDeleted(anyLong(), anyBoolean())).willReturn(Optional.of(memorialBook));
		BDDMockito.given(petRepository.findByIdAndIsDeleted(anyLong(), anyBoolean())).willReturn(Optional.of(pet));
		BDDMockito.given(authentication.getPrincipal()).willReturn(principalDetails);
		BDDMockito.given(principalDetails.getUser()).willReturn(user);
		MemorialBookTestResultRequestDto requestDto = new MemorialBookTestResultRequestDto(30);

		// then
		Assertions.assertThatThrownBy(() -> memorialBookService.addPsychologicalTestResult(
				authentication, 1L, 1L, requestDto))
			.isInstanceOf(ExceptionResponse.class)
			.hasFieldOrPropertyWithValue("customException", CustomException.WRONG_TYPE_EXCEPTION);
	}

	@Test
	@DisplayName("다른_사용자의_메모리얼북_심리_검사_결과_추가_에러_테스트")
	public void 다른_사용자의_메모리얼북_심리_검사_결과_추가_에러_테스트() {
		// given
		User otherUser = User.signUpUser(new JoinRequestDto("otherEmail", "password", "name", "010-1111-1111",
			LocalDate.now(), Gender.MALE, LocalTime.now(), Role.ROLE_USER));
		Pet otherPet = Pet.createPet(otherUser, new CreatePetRequestDto("otherPetName", 10,
			LocalDate.of(1990, 1, 1), "species", PetGender.MALE,
			"relationship", List.of("개구쟁이", "귀염둥이")), "profileImageUrl");
		MemorialBook otherMemorialBook = MemorialBook.createMemorialBook(otherPet);
		MemorialBookTestResultRequestDto requestDto = new MemorialBookTestResultRequestDto(10);
		ReflectionTestUtils.setField(otherUser, "id", 1L);

		BDDMockito.given(memorialBookRepository.findByIdAndIsDeleted(anyLong(), anyBoolean())).willReturn(Optional.of(otherMemorialBook));
		BDDMockito.given(petRepository.findByIdAndIsDeleted(anyLong(), anyBoolean())).willReturn(Optional.of(otherPet));
		BDDMockito.given(authentication.getPrincipal()).willReturn(principalDetails);
		BDDMockito.given(principalDetails.getUser()).willReturn(user);

		// then
		Assertions.assertThatThrownBy(() -> memorialBookService.addPsychologicalTestResult(
				authentication, 1L, 1L, requestDto))
			.isInstanceOf(ExceptionResponse.class)
			.hasFieldOrPropertyWithValue("customException", CustomException.NOT_MY_MEMORIAL_BOOK_EXCEPTION);
	}
}