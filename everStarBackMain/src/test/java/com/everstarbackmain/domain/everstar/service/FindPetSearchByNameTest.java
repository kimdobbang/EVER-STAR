package com.everstarbackmain.domain.everstar.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Collections;
import java.util.List;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.BDDMockito;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;

import com.everstarbackmain.domain.everstar.responsedto.EverStarPetSearchResponseDto;
import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.pet.model.PetGender;
import com.everstarbackmain.domain.pet.repository.PetRepository;
import com.everstarbackmain.domain.pet.requestdto.CreatePetRequestDto;
import com.everstarbackmain.domain.user.model.Gender;
import com.everstarbackmain.domain.user.model.Role;
import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.domain.user.requestDto.JoinRequestDto;
import com.everstarbackmain.global.security.auth.PrincipalDetails;

@ExtendWith(MockitoExtension.class)
public class FindPetSearchByNameTest {

	@InjectMocks
	private EverStarService everStarService;

	@Mock
	private PetRepository petRepository;

	@Mock
	private Pageable pageable;

	private User user;
	private Pet pet;

	@BeforeEach
	public void setUp() {
		user = User.signUpUser(new JoinRequestDto("email", "password", "name", "010-1111-1111",
			LocalDate.now(), Gender.MALE, LocalTime.now(), Role.ROLE_USER));

		pet = Pet.createPet(user, new CreatePetRequestDto("petName", 10,
			LocalDate.of(1990, 1, 1), "species", PetGender.MALE,
			"relationship", List.of("개구쟁이", "귀염둥이")), "profileImageUrl");
	}

	@Test
	@DisplayName("펫 이름 검색 성공 테스트")
	public void 펫_이름_검색_성공_테스트() {
		Page<EverStarPetSearchResponseDto> expectedPage = new PageImpl<>(
			Collections.singletonList(new EverStarPetSearchResponseDto(1L, "test", "test", "test@test.com"))
		);

		BDDMockito.given(petRepository.searchByPetName(pet.getName(), pageable)).willReturn(expectedPage);

		//when then
		Assertions.assertThatNoException()
			.isThrownBy(() -> everStarService.getPetSearchByName(pet.getName(), pageable));
	}
}
