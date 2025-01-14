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
import com.everstarbackmain.domain.petterLetter.util.PetLetterScheduler;
import com.everstarbackmain.domain.user.model.Gender;
import com.everstarbackmain.domain.user.model.Role;
import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.domain.user.requestDto.JoinRequestDto;
import com.everstarbackmain.domain.userLetter.model.UserLetter;
import com.everstarbackmain.domain.userLetter.repository.UserLetterRepository;
import com.everstarbackmain.domain.userLetter.requestDto.WriteLetterRequestDto;
import com.everstarbackmain.global.security.auth.PrincipalDetails;
import com.everstarbackmain.global.util.S3UploadUtil;

@ExtendWith(MockitoExtension.class)
public class WriteLetterServiceTest {

	@InjectMocks
	private UserLetterService userLetterService;

	@Mock
	private UserLetterRepository userLetterRepository;

	@Mock
	private PetRepository petRepository;

	@Mock
	private PetLetterScheduler petLetterScheduler;

	@Mock
	private Authentication authentication;

	@Mock
	private PrincipalDetails principalDetails;

	@Mock
	private MultipartFile file;

	@Mock
	private S3UploadUtil s3UploadUtil;

	private WriteLetterRequestDto requestDto;
	private WriteLetterRequestDto noImageRequestDto;
	private User user;
	private Pet pet;
	private UserLetter userLetter;

	@BeforeEach
	public void setUp() {
		user = User.signUpUser(new JoinRequestDto("email", "password", "name", "010-1111-1111",
			LocalDate.now(), Gender.MALE, LocalTime.now(), Role.ROLE_USER));

		pet = Pet.createPet(user, new CreatePetRequestDto("petName", 10,
			LocalDate.of(1990, 1, 1), "species", PetGender.MALE,
			"relationship", List.of("개구쟁이", "귀염둥이")), "profileImageUrl");

		requestDto = new WriteLetterRequestDto("dd");
		noImageRequestDto = new WriteLetterRequestDto("dd");
		userLetter = UserLetter.writeLetterHasImage(pet, "filteredContent", "imgUrl");
	}

	@Test
	@DisplayName("유저 편지 쓰기 성공 테스트")
	public void 유저_편지_쓰기_성공_테스트() {
		long id = 1;
		//given
		BDDMockito.given(authentication.getPrincipal()).willReturn(principalDetails);
		BDDMockito.given(principalDetails.getUser()).willReturn(user);
		BDDMockito.given(petRepository.findByIdAndUserAndIsDeleted(id, user, false)).willReturn(Optional.of(pet));

		//then
		Assertions.assertThatNoException()
			.isThrownBy(() -> userLetterService.writeLetter(authentication, id, requestDto, file));
	}

	@Test
	@DisplayName("유저 편지 쓰기 성공 테스트 이미지 없음")
	public void 유저_편지_쓰기_성공_테스트_이미지_없음() {
		long id = 1;
		//given
		BDDMockito.given(authentication.getPrincipal()).willReturn(principalDetails);
		BDDMockito.given(principalDetails.getUser()).willReturn(user);
		BDDMockito.given(petRepository.findByIdAndUserAndIsDeleted(id, user, false)).willReturn(Optional.of(pet));

		//then
		Assertions.assertThatNoException()
			.isThrownBy(() -> userLetterService.writeLetter(authentication, id, noImageRequestDto, file));
	}
}
