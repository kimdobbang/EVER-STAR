package com.everstarbackmain.domain.pet.service;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.BDDMockito.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.springframework.security.core.Authentication;
import org.springframework.test.util.ReflectionTestUtils;

import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.pet.model.PetGender;
import com.everstarbackmain.domain.pet.model.PetPersonality;
import com.everstarbackmain.domain.pet.repository.PetPersonalityRepository;
import com.everstarbackmain.domain.pet.repository.PetRepository;
import com.everstarbackmain.domain.pet.requestdto.CreatePetRequestDto;
import com.everstarbackmain.domain.pet.responsedto.MyPagePetInfoResponseDto;
import com.everstarbackmain.domain.user.model.Gender;
import com.everstarbackmain.domain.user.model.Role;
import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.domain.user.requestDto.JoinRequestDto;
import com.everstarbackmain.global.security.auth.PrincipalDetails;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)

public class MyPagePetInfoTest {

	@Mock
	private PetRepository petRepository;

	@Mock
	private PetPersonalityRepository petPersonalityRepository;

	@Mock
	private Authentication authentication;

	@Mock
	private PrincipalDetails principalDetails;

	@InjectMocks
	private PetService petService;
	private User user;
	private CreatePetRequestDto requestDto;
	private Pet pet;
	private List<PetPersonality> petPersonalities;

	@BeforeEach
	public void setUp() {
		user = User.signUpUser(new JoinRequestDto("email", "password", "name", "010-1111-1111", LocalDate.now(),
			Gender.MALE, LocalTime.now(), Role.ROLE_USER));
		ReflectionTestUtils.setField(user, "id", 1L);

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

		petPersonalities = List.of(
			mockPersonality("Friendly"),
			mockPersonality("Playful"),
			mockPersonality("Curious")
		);
	}

	private PetPersonality mockPersonality(String value) {
		PetPersonality personality = mock(PetPersonality.class);
		given(personality.getPersonalityValue()).willReturn(value);
		return personality;

	}

	@Test
	@DisplayName("마이페이지에서 펫 정보 조회 성공 테스트")
	public void 마이페이지_펫정보_조회성공_테스트() {
		// given
		given(authentication.getPrincipal()).willReturn(principalDetails);
		given(principalDetails.getUser()).willReturn(user);
		given(petRepository.findByIdAndUserAndIsDeleted(1L, user, false)).willReturn(Optional.of(pet));

		// Mock PetPersonality values
		given(petPersonalityRepository.findPersonalityValuesByPetIdAndIsDeleted(1L, false))
			.willReturn(List.of("Friendly", "Playful", "Curious"));

		// when
		MyPagePetInfoResponseDto responseDto = petService.getMyPetInfo(user, 1L);

		// then
		assertThat(responseDto).isNotNull();
		assertThat(responseDto.getId()).isEqualTo(pet.getId());
		assertThat(responseDto.getUserId()).isEqualTo(pet.getUser().getId());
		assertThat(responseDto.getProfileImageUrl()).isEqualTo(pet.getProfileImageUrl());
		assertThat(responseDto.getName()).isEqualTo(pet.getName());
		assertThat(responseDto.getGender()).isEqualTo(pet.getGender());
		assertThat(responseDto.getAge()).isEqualTo(pet.getAge());
		assertThat(responseDto.getMemorialDate()).isEqualTo(pet.getMemorialDate());
		assertThat(responseDto.getRelationship()).isEqualTo(pet.getRelationship());
		assertThat(responseDto.getSpecies()).isEqualTo(pet.getSpecies());
		assertThat(responseDto.getPetPersonalities()).containsExactly("Friendly", "Playful", "Curious");
	}

	@Test
	@DisplayName("마이페이지에서 펫 정보 조회 실패 - 유저가 소유하지 않은 펫")
	public void 마이페이지_펫정보_조회실패_테스트_다른유저_펫() {
		// given
		User anotherUser = User.signUpUser(
			new JoinRequestDto("anotheremail", "anotherpassword", "anothername", "010-2222-2222", LocalDate.now(),
				Gender.FEMALE, LocalTime.now(), Role.ROLE_USER));

		Pet anotherPet = Pet.builder()
			.user(anotherUser)
			.name("고승냥희")
			.age(9)
			.memorialDate(LocalDate.of(2022, 8, 1))
			.species("승냥이")
			.gender(PetGender.FEMALE)
			.relationship("relationship")
			.profileImageUrl("profileImageUrl")
			.build();
		ReflectionTestUtils.setField(anotherPet, "id", 2L);

		given(authentication.getPrincipal()).willReturn(principalDetails);
		given(principalDetails.getUser()).willReturn(user);
		given(petRepository.findByIdAndIsDeleted(2L, false)).willReturn(java.util.Optional.of(anotherPet));

		// when
		Throwable thrown = catchThrowable(() -> petService.getMyPetInfo(user, 1L));

		// then
		assertThat(thrown).isNotNull();  // 예외가 발생했는지 확인
	}

	@Test
	@DisplayName("마이페이지에서 펫 정보 조회 실패 - 존재하지 않는 경우")
	public void 마이페이지_펫정보_조회실패_테스트_펫없음() {
		// given
		given(authentication.getPrincipal()).willReturn(principalDetails);
		given(principalDetails.getUser()).willReturn(user);
		given(petRepository.findByIdAndIsDeleted(1L, false)).willReturn(Optional.empty());

		// when
		Throwable thrown = catchThrowable(() -> petService.getMyPetInfo(user, 1L));

		// then
		assertThat(thrown).isInstanceOf(Throwable.class);
	}

}
