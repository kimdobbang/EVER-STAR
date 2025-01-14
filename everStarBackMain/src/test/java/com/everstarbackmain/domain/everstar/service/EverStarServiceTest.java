package com.everstarbackmain.domain.everstar.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.BDDMockito.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.Optional;

import com.everstarbackmain.domain.everstar.responsedto.EverStarPetInfoResponseDto;
import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.pet.model.PetGender;
import com.everstarbackmain.domain.pet.repository.PetRepository;
import com.everstarbackmain.domain.user.model.Gender;
import com.everstarbackmain.domain.user.model.Role;
import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.global.exception.CustomException;
import com.everstarbackmain.global.exception.ExceptionResponse;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

@ExtendWith(MockitoExtension.class)
public class EverStarServiceTest {

	@Mock
	private PetRepository petRepository;

	@InjectMocks
	private EverStarService everStarService;

	private Pet pet;
	private User user;

	@BeforeEach
	void setUp() {
		user = User.builder()
			.email("test@example.com")
			.password("password")
			.userName("testUser")
			.phoneNumber("010-1234-5678")
			.birthDate(LocalDate.of(1990, 1, 1))
			.gender(Gender.MALE)
			.questReceptionTime(LocalTime.now())
			.role(Role.ROLE_USER)
			.build();

		pet = Pet.builder()
			.user(user)
			.name("PetName")
			.age(5)
			.memorialDate(LocalDate.of(2020, 1, 1))
			.species("Dog")
			.gender(PetGender.MALE)
			.relationship("Friend")
			.profileImageUrl("http://image.url")
			.introduction("Pet Introduction")
			.build();

		ReflectionTestUtils.setField(pet, "id", 1L);
	}

	@Test
	@DisplayName("펫 정보 조회 성공 테스트")
	void 펫정보_조회_성공() {
		// given
		Long petId = 1L;
		given(petRepository.findByIdAndIsDeleted(petId, false)).willReturn(Optional.of(pet));
		given(petRepository.findPetPersonalitiesByIdAndIsDeleted(petId, false))
			.willReturn(Arrays.asList("Friendly", "Playful"));

		// when
		EverStarPetInfoResponseDto responseDto = everStarService.getEverStarPetInfo(petId);

		// then
		assertThat(responseDto).isNotNull();
		assertThat(responseDto.getId()).isEqualTo(pet.getId());
		assertThat(responseDto.getName()).isEqualTo(pet.getName());
		assertThat(responseDto.getUserId()).isEqualTo(pet.getUser().getId());
		assertThat(responseDto.getProfileImageUrl()).isEqualTo(pet.getProfileImageUrl());
		assertThat(responseDto.getIntroduction()).isEqualTo(pet.getIntroduction());
		assertThat(responseDto.getAge()).isEqualTo(pet.getAge());
		assertThat(responseDto.getMemorialDate()).isEqualTo(pet.getMemorialDate());
		assertThat(responseDto.getPetPersonalities()).containsExactlyInAnyOrder("Friendly", "Playful");
	}

	@Test
	@DisplayName("펫 정보 조회 실패 - 존재하지 않는 펫")
	void 펫정보_조회_실패_펫미존재() {
		// given
		Long petId = 1L;
		given(petRepository.findByIdAndIsDeleted(petId, false)).willReturn(Optional.empty());

		// when & then
		ExceptionResponse thrownException = assertThrows(ExceptionResponse.class, () -> {
			everStarService.getEverStarPetInfo(petId);
		});

		assertThat(thrownException.getCustomException()).isEqualTo(CustomException.NOT_FOUND_PET_EXCEPTION);
	}

	@Test
	@DisplayName("랜덤 펫 정보 조회 성공 테스트")
	void 랜덤_펫정보_조회_성공() {
		// given
		Pet otherPet = Pet.builder()
			.user(user)
			.name("OtherPetName")
			.age(3)
			.memorialDate(LocalDate.of(2021, 1, 1))
			.species("Cat")
			.gender(PetGender.FEMALE)
			.relationship("Companion")
			.profileImageUrl("http://otherimage.url")
			.introduction("Other Pet Introduction")
			.build();
		ReflectionTestUtils.setField(pet, "id", 2L);

		given(petRepository.findRandomActivePetIdExcluding(anyLong())).willReturn(1L);
		given(petRepository.findByIdAndIsDeleted(anyLong(), anyBoolean())).willReturn(Optional.of(otherPet));

		// when
		EverStarPetInfoResponseDto responseDto = everStarService.getRandomEverStarPetInfo(pet.getId());

		// then
		assertThat(responseDto).isNotNull();
		assertThat(responseDto.getId()).isEqualTo(otherPet.getId());
		assertThat(responseDto.getName()).isEqualTo(otherPet.getName());
		assertThat(responseDto.getUserId()).isEqualTo(otherPet.getUser().getId());
		assertThat(responseDto.getProfileImageUrl()).isEqualTo(otherPet.getProfileImageUrl());
		assertThat(responseDto.getIntroduction()).isEqualTo(otherPet.getIntroduction());
		assertThat(responseDto.getAge()).isEqualTo(otherPet.getAge());
		assertThat(responseDto.getMemorialDate()).isEqualTo(otherPet.getMemorialDate());
	}

	@Test
	@DisplayName("랜덤 펫 정보 조회 실패 - 펫이 없는 경우")
	void 랜덤_펫정보_조회_실패_펫없음() {
		// given
		Long excludedPetId = pet.getId();
		given(petRepository.findRandomActivePetIdExcluding(excludedPetId)).willReturn(null);

		// when & then
		ExceptionResponse thrownException = assertThrows(ExceptionResponse.class, () -> {
			everStarService.getRandomEverStarPetInfo(excludedPetId);
		});

		assertThat(thrownException.getCustomException()).isEqualTo(CustomException.NOT_FOUND_PET_EXCEPTION);
	}
}
