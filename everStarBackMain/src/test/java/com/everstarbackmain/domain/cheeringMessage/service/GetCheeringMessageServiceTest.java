package com.everstarbackmain.domain.cheeringMessage.service;

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
import org.mockito.BDDMockito;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;

import com.everstarbackmain.domain.cheeringMessage.model.Color;
import com.everstarbackmain.domain.cheeringMessage.repository.CheeringMessageRepository;
import com.everstarbackmain.domain.cheeringMessage.responseDto.CheeringMessageResponseDto;
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
public class GetCheeringMessageServiceTest {

	@InjectMocks
	private CheeringMessageService cheeringMessageService;

	@Mock
	private CheeringMessageRepository cheeringMessageRepository;

	@Mock
	private PetRepository petRepository;

	@Mock
	private Authentication authentication;

	@Mock
	private PrincipalDetails principalDetails;

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
	@DisplayName("응원메시지 목록 조회 성공 테스트")
	public void 응원_메시지_목록_조회_성공_테스트() {
		//given
		BDDMockito.given(petRepository.findByIdAndIsDeleted(1L, false)).willReturn(Optional.of(pet));

		Page<CheeringMessageResponseDto> expectedPage = new PageImpl<>(
			Collections.singletonList(new CheeringMessageResponseDto(1L, "1", true, "test", "name", Color.BLUE))
		);
		BDDMockito.given(cheeringMessageRepository.findCheeringMessagesByPetId(pet, pageable)).willReturn(expectedPage);

		//when
		Page<CheeringMessageResponseDto> actualPage = cheeringMessageService.getCheeringMessages(1L, pageable);

		//then
		Assertions.assertThat(actualPage).isEqualTo(expectedPage);
	}

	@Test
	@DisplayName("응원메시지 목록 조회 실패 펫이 존재하지 않음 테스트")
	public void 응원_메시지_목록_펫_존재하지_않음_실패_테스트() {
		//when then
		Assertions.assertThatThrownBy(() -> cheeringMessageService.getCheeringMessages(1L, pageable))
			.isInstanceOf(ExceptionResponse.class)
			.hasFieldOrPropertyWithValue("customException", CustomException.NOT_FOUND_PET_EXCEPTION);
	}
}
