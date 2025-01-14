package com.everstarbackmain.domain.petLetter.controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.pet.model.PetGender;
import com.everstarbackmain.domain.pet.requestdto.CreatePetRequestDto;
import com.everstarbackmain.domain.petterLetter.controller.PetLetterController;
import com.everstarbackmain.domain.petterLetter.model.PetLetter;
import com.everstarbackmain.domain.petterLetter.responsedto.getLetterResponseDto.GetLetterResponseDto;
import com.everstarbackmain.domain.petterLetter.service.PetLetterService;
import com.everstarbackmain.domain.user.model.Gender;
import com.everstarbackmain.domain.user.model.Role;
import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.domain.user.requestDto.JoinRequestDto;
import com.everstarbackmain.domain.userLetter.model.UserLetter;
import com.everstarbackmain.domain.userLetter.requestDto.WriteLetterRequestDto;
import com.everstarbackmain.global.auth.WithMockAuthUser;
import com.everstarbackmain.global.config.SecurityConfig;
import com.everstarbackmain.global.util.HttpResponseUtil;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(
	controllers = PetLetterController.class,
	excludeFilters = {
		@ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = SecurityConfig.class)
	}
)
@MockBean(JpaMetamodelMappingContext.class)
public class PetLetterControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper;

	@MockBean
	private PetLetterService petLetterService;

	@MockBean
	private HttpResponseUtil responseUtil;

	@Mock
	private Authentication authentication;

	@Mock
	private Pageable pageable;

	@Mock
	private Page page;

	private User user;
	private Pet pet;
	private UserLetter userLetter;
	private PetLetter petLetter;
	private WriteLetterRequestDto requestDto;
	private GetLetterResponseDto getLetterResponseDto;

	@BeforeEach
	public void setUp() throws Exception {
		user = User.signUpUser(new JoinRequestDto("email", "password", "name", "010-1111-1111",
			LocalDate.now(), Gender.MALE, LocalTime.now(), Role.ROLE_USER));

		pet = Pet.createPet(user, new CreatePetRequestDto("petName", 10,
			LocalDate.of(1990, 1, 1), "species", PetGender.MALE,
			"relationship", List.of("개구쟁이", "귀염둥이")), "profileImageUrl");

		requestDto = new WriteLetterRequestDto("dd");
		userLetter = UserLetter.writeLetterHasNotImage(pet, "filteredContent");
		petLetter = PetLetter.writePetLetterAnswer(userLetter, "content");
		getLetterResponseDto = GetLetterResponseDto.createGetLetterResponseDto(petLetter);
	}

	@Test
	@DisplayName("펫 보낸 편지 보기 성공 테스트")
	@WithMockAuthUser(email = "test@gmail.com", role = Role.ROLE_USER)
	public void 펫_보낸_편지_보기_성공_테스트() throws Exception {
		//given
		Map<String, Object> response = new HashMap<>();
		BDDMockito.given(petLetterService.getPetLetters(authentication, 1L, pageable)).willReturn(page);

		response.put("data", petLetterService.getPetLetters(authentication, 1L, pageable));

		ResultActions result = mockMvc.perform(MockMvcRequestBuilders.get("/api/pets/1/letters?page=0&size=10")
			.with(SecurityMockMvcRequestPostProcessors.csrf())
			.contentType(MediaType.APPLICATION_JSON)
		);

		result.andExpect(MockMvcResultMatchers.status().isOk());
	}

	@Test
	@DisplayName(" 편지 개별 조회 성공 테스트")
	@WithMockAuthUser(email = "test@gmail.com", role = Role.ROLE_USER)
	public void 편지_개별_조회_성공_테스트() throws Exception {
		Map<String, Object> response = new HashMap<>();
		BDDMockito.given(petLetterService.getLetter(authentication, 1L, 1L)).willReturn(getLetterResponseDto);
		BDDMockito.given(responseUtil.createResponse(getLetterResponseDto)).willReturn(ResponseEntity.ok().body(response));

		ResultActions resultActions = mockMvc.perform(MockMvcRequestBuilders.get("/api/pets/1/letters/1")
			.with(SecurityMockMvcRequestPostProcessors.csrf())
			.contentType(MediaType.APPLICATION_JSON)
		);

		resultActions.andExpect(MockMvcResultMatchers.status().isOk());
	}
}
