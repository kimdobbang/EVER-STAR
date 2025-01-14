package com.everstarbackmain.domain.pet.service;

import static org.mockito.BDDMockito.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.core.Authentication;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.multipart.MultipartFile;

import com.everstarbackmain.domain.memorialBook.repository.MemorialBookRepository;
import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.pet.model.PetGender;
import com.everstarbackmain.domain.pet.model.PetPersonality;
import com.everstarbackmain.domain.pet.repository.PetPersonalityRepository;
import com.everstarbackmain.domain.pet.repository.PetRepository;
import com.everstarbackmain.domain.pet.requestdto.CreatePetRequestDto;
import com.everstarbackmain.domain.pet.responsedto.EnrolledPetsResponseDto;
import com.everstarbackmain.domain.petterLetter.util.PetLetterScheduler;
import com.everstarbackmain.domain.sentimentAnalysis.repository.SentimentAnalysisRepository;
import com.everstarbackmain.domain.user.model.Gender;
import com.everstarbackmain.domain.user.model.Role;
import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.domain.user.requestDto.JoinRequestDto;
import com.everstarbackmain.global.security.auth.PrincipalDetails;
import com.everstarbackmain.global.util.S3UploadUtil;

@ExtendWith(MockitoExtension.class)
public class PetServiceTest {

	@Mock
	private PetRepository petRepository;

	@Mock
	private PetPersonalityRepository petPersonalityRepository;

	@Mock
	private MemorialBookRepository memorialBookRepository;

	@Mock
	private SentimentAnalysisRepository sentimentAnalysisRepository;

	@Mock
	private PetLetterScheduler petLetterScheduler;

	@Mock
	private S3UploadUtil s3UploadUtil;

	@Mock
	private Authentication authentication;

	@Mock
	private PrincipalDetails principalDetails;

	@InjectMocks
	private PetService petService;

	private User user;
	private CreatePetRequestDto requestDto;
	private Pet pet;
	private List<Pet> petList;

	@BeforeEach
	public void setup() {
		user = User.signUpUser(new JoinRequestDto("email", "password", "name", "010-1111-1111", LocalDate.now(),
			Gender.MALE, LocalTime.now(), Role.ROLE_USER));
		requestDto = new CreatePetRequestDto("petName", 10,
			LocalDate.of(1990, 1, 1), "species", PetGender.MALE,
			"relationship", List.of("개구쟁이", "귀염둥이", "사랑스러운"));

		pet = Pet.builder()
			.user(user)
			.name("쫑아지")
			.age(10)
			.memorialDate(LocalDate.of(2024, 8, 1))
			.species("CAT")
			.gender(PetGender.MALE)
			.relationship("relationship")
			.profileImageUrl("profileImageUrl")
			.build();

		ReflectionTestUtils.setField(pet, "id", 1L);

		petList = List.of(pet);
	}

	@Test
	@DisplayName("펫 생성 성공 테스트 - 성격 리스트 저장")
	public void 펫_생성_성공_테스트_성격리스트저장() {
		// given
		given(petRepository.save(any(Pet.class))).willReturn(pet);
		given(s3UploadUtil.saveFile(any(MultipartFile.class))).willReturn("profileImageUrl");

		MockMultipartFile profileImage = new MockMultipartFile(
			"profileImage",
			"profileImage.jpg",
			"image/jpeg",
			"test image content".getBytes()
		);

		// when
		petService.createPet(user, requestDto, profileImage);

		// then
		verify(petRepository).save(any(Pet.class));
		verify(petPersonalityRepository, times(requestDto.getPersonalities().size())).save(any(PetPersonality.class));
	}

	@Test
	@DisplayName("유저의 반려동물 목록 조회 성공 테스트 - 존재하는 경우")
	public void 유저의_반려동물_목록_조회_성공_테스트_존재하는경우() {
		// given
		given(petRepository.findAllByUserIdAndIsDeleted(user.getId(), false)).willReturn(petList);

		// when
		List<EnrolledPetsResponseDto> responseDtos = petService.getAllUserPets(user);

		// then
		Assertions.assertThat(responseDtos).isNotEmpty();
		Assertions.assertThat(responseDtos.size()).isEqualTo(1);

		EnrolledPetsResponseDto responseDto = responseDtos.get(0);
		Assertions.assertThat(responseDto.getProfileImageUrl()).isEqualTo(pet.getProfileImageUrl());
		Assertions.assertThat(responseDto.getName()).isEqualTo(pet.getName());
	}

	@Test
	@DisplayName("유저의 반려동물 목록 조회 성공 테스트 - 존재하지 않는 경우")
	public void 유저의_반려동물_목록_조회_성공_테스트_존재하지않는경우() {
		// given
		given(petRepository.findAllByUserIdAndIsDeleted(user.getId(), false)).willReturn(Collections.emptyList());

		// when
		List<EnrolledPetsResponseDto> responseDtos = petService.getAllUserPets(user);

		// then
		Assertions.assertThat(responseDtos).isEmpty();
	}

	@Test
	@DisplayName("펫_프로필_이미지_수정_성공_테스트")
	public void 펫_프로필_이미지_수정_성공_테스트() {
		// given
		given(petRepository.findByIdAndUserAndIsDeleted(pet.getId(), user, false)).willReturn(Optional.of(pet));
		given(s3UploadUtil.saveFile(any(MultipartFile.class))).willReturn("newProfileImageUrl");

		MockMultipartFile newProfileImage = new MockMultipartFile(
			"profileImage",
			"newProfileImage.jpg",
			"image/jpeg",
			"new test image content".getBytes()
		);

		// when
		petService.updatePetProfileImage(user, pet.getId(), newProfileImage);

		// then
		verify(petRepository).findByIdAndUserAndIsDeleted(pet.getId(), user, false);
		verify(s3UploadUtil).saveFile(any(MultipartFile.class));
		Assertions.assertThat(pet.getProfileImageUrl()).isEqualTo("newProfileImageUrl");
	}
}