package com.everstarbackmain.domain.userLetter.service;

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
import org.springframework.web.multipart.MultipartFile;

import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.pet.model.PetGender;
import com.everstarbackmain.domain.pet.repository.PetRepository;
import com.everstarbackmain.domain.pet.requestdto.CreatePetRequestDto;
import com.everstarbackmain.domain.petterLetter.model.PetLetter;
import com.everstarbackmain.domain.petterLetter.repository.PetLetterRepository;
import com.everstarbackmain.domain.user.model.Gender;
import com.everstarbackmain.domain.user.model.Role;
import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.domain.user.requestDto.JoinRequestDto;
import com.everstarbackmain.domain.userLetter.model.UserLetter;
import com.everstarbackmain.domain.userLetter.repository.UserLetterRepository;
import com.everstarbackmain.domain.userLetter.requestDto.WriteLetterRequestDto;
import com.everstarbackmain.global.exception.CustomException;
import com.everstarbackmain.global.exception.ExceptionResponse;
import com.everstarbackmain.global.security.auth.PrincipalDetails;
import com.everstarbackmain.global.util.S3UploadUtil;

@ExtendWith(MockitoExtension.class)
public class WriteLetterAnswerServiceTest {

	@InjectMocks
	private UserLetterService userLetterService;

	@Mock
	private UserLetterRepository userLetterRepository;

	@Mock
	private PetRepository petRepository;

	@Mock
	private PetLetterRepository petLetterRepository;

	@Mock
	private Authentication authentication;

	@Mock
	private PrincipalDetails principalDetails;

	@Mock
	private MultipartFile file;

	@Mock
	private S3UploadUtil s3UploadUtil;

	private User user;
	private Pet pet;
	private PetLetter petLetter;
	private PetLetter petLetterTypeByUser;
	private UserLetter userLetter;
	private WriteLetterRequestDto requestDto;
	private WriteLetterRequestDto writeLetterRequestDto;

	@BeforeEach
	public void setUp() {
		user = User.signUpUser(new JoinRequestDto("email", "password", "name", "010-1111-1111",
			LocalDate.now(), Gender.MALE, LocalTime.now(), Role.ROLE_USER));

		pet = Pet.createPet(user, new CreatePetRequestDto("petName", 10,
			LocalDate.of(1990, 1, 1), "species", PetGender.MALE,
			"relationship", List.of("개구쟁이", "귀염둥이")), "profileImageUrl");

		writeLetterRequestDto = new WriteLetterRequestDto("content");
		userLetter = UserLetter.writeLetterHasNotImage(pet, "filteredContent");
		petLetter = PetLetter.writePetLetter(pet, "content");
		petLetterTypeByUser = PetLetter.writePetLetterAnswer(userLetter, "content");
		requestDto = new WriteLetterRequestDto("dd");
	}

	@Test
	@DisplayName("펫이 보낸 편지에 답장쓰기 성공 테스트")
	public void 펫이_보낸_편지_답장_쓰기_성공_테스트() {

		//given
		BDDMockito.given(authentication.getPrincipal()).willReturn(principalDetails);
		BDDMockito.given(principalDetails.getUser()).willReturn(user);
		BDDMockito.given(petRepository.findByIdAndUserAndIsDeleted(1L, user, false)).willReturn(Optional.of(pet));
		BDDMockito.given(petLetterRepository.findPetLetterByIdAndPetAndIsDeleted(1L, pet, false))
			.willReturn(Optional.of(petLetter));

		// when then
		Assertions.assertThatNoException()
			.isThrownBy(() -> userLetterService.writeLetterAnswer(authentication, 1L, 1L, requestDto, file));
	}

	@Test
	@DisplayName("펫이 보낸 편지에 답장쓰기 접근할수 없는 타입 실패 테스트")
	public void 펫이_보낸_편지_답장_쓰기_접근_불가_타입_실패_테스트() {

		//given
		BDDMockito.given(authentication.getPrincipal()).willReturn(principalDetails);
		BDDMockito.given(principalDetails.getUser()).willReturn(user);
		BDDMockito.given(petRepository.findByIdAndUserAndIsDeleted(1L, user, false)).willReturn(Optional.of(pet));
		BDDMockito.given(petLetterRepository.findPetLetterByIdAndPetAndIsDeleted(1L, pet, false))
			.willReturn(Optional.of(petLetterTypeByUser));

		// when then
		Assertions.assertThatThrownBy(() -> userLetterService.writeLetterAnswer(authentication, 1L, 1L, requestDto, file))
			.isInstanceOf(ExceptionResponse.class)
			.hasFieldOrPropertyWithValue("customException", CustomException.ACCESS_LETTER_SEND_TYPE);
	}

	@Test
	@DisplayName("펫이 보낸 편지에 답장쓰기 이미 씀 실패 테스트")
	public void 펫이_보낸_편지_답장_쓰기_이미_씀_실패_테스트() {

		//given
		BDDMockito.given(authentication.getPrincipal()).willReturn(principalDetails);
		BDDMockito.given(principalDetails.getUser()).willReturn(user);
		BDDMockito.given(petRepository.findByIdAndUserAndIsDeleted(1L, user, false)).willReturn(Optional.of(pet));
		petLetter.fetchReplyLetter(userLetter);
		BDDMockito.given(petLetterRepository.findPetLetterByIdAndPetAndIsDeleted(1L, pet, false))
			.willReturn(Optional.of(petLetter));

		// when then
		Assertions.assertThatThrownBy(() -> userLetterService.writeLetterAnswer(authentication, 1L, 1L, requestDto, file))
			.isInstanceOf(ExceptionResponse.class)
			.hasFieldOrPropertyWithValue("customException", CustomException.NOT_ACCESS_SEND_LETTER_ANSWER);
	}
}
