package com.everstarbackmain.domain.cheeringMessage.controller;

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
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.everstarbackmain.domain.cheeringMessage.message.SuccessCheeringMessageMessage;
import com.everstarbackmain.domain.cheeringMessage.model.CheeringMessage;
import com.everstarbackmain.domain.cheeringMessage.model.Color;
import com.everstarbackmain.domain.cheeringMessage.requestDto.CreateCheeringMessageRequestDto;
import com.everstarbackmain.domain.cheeringMessage.responseDto.CheeringMessageDetailResponseDto;
import com.everstarbackmain.domain.cheeringMessage.service.CheeringMessageService;
import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.pet.model.PetGender;
import com.everstarbackmain.domain.pet.requestdto.CreatePetRequestDto;
import com.everstarbackmain.domain.user.model.Gender;
import com.everstarbackmain.domain.user.model.Role;
import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.domain.user.requestDto.JoinRequestDto;
import com.everstarbackmain.global.auth.WithMockAuthUser;
import com.everstarbackmain.global.config.SecurityConfig;
import com.everstarbackmain.global.util.HttpResponseUtil;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(
	controllers = CheeringMessageController.class,
	excludeFilters = {
		@ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = SecurityConfig.class)
	}
)
@MockBean(JpaMetamodelMappingContext.class)
public class CheeringMessageControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper;

	@MockBean
	private CheeringMessageService cheeringMessageService;

	@MockBean
	private HttpResponseUtil responseUtil;

	@Mock
	private Authentication authentication;

	private User user;
	private Pet pet;
	private CreateCheeringMessageRequestDto requestDto;
	private CheeringMessage cheeringMessage;
	private CheeringMessageDetailResponseDto responseDto;

	@BeforeEach
	public void setUp() throws Exception {
		user = User.signUpUser(new JoinRequestDto("email", "password", "name", "010-1111-1111", LocalDate.now(),
			Gender.MALE, LocalTime.now(), Role.ROLE_USER));

		pet = Pet.createPet(user, new CreatePetRequestDto("petName", 10,
			LocalDate.of(1990, 1, 1), "species", PetGender.MALE,
			"relationship", List.of("개구쟁이", "귀염둥이")), "profileImageUrl");

		requestDto = new CreateCheeringMessageRequestDto("content", Color.BLUE, true);
		cheeringMessage = CheeringMessage.createAnonymousCheeringMessage(requestDto, pet, "filteredContent");
		responseDto = CheeringMessageDetailResponseDto.createCheeringMessageDetailResponseDto(cheeringMessage);
	}

	@Test
	@DisplayName("응원 메시지 성공 테스트")
	@WithMockAuthUser(email = "test@gmail.com", role = Role.ROLE_USER)
	public void 응원_메시지_성공_테스트() throws Exception {
		//given
		Map<String, Object> response = new HashMap<>();
		BDDMockito.given(cheeringMessageService.createCheeringMessage(authentication, 1L, 1L, requestDto)).willReturn(responseDto);
		String requestBody = objectMapper.writeValueAsString(requestDto);
		response.put("data", SuccessCheeringMessageMessage.SUCCESS_CREATE_CHEERINGMESSAGE);

		ResultActions result = mockMvc.perform(MockMvcRequestBuilders.post("/api/pets/1/find/1/cheeringMessages")
			.with(SecurityMockMvcRequestPostProcessors.csrf())
			.contentType(MediaType.APPLICATION_JSON)
			.content(requestBody)
		);

		result.andExpect(MockMvcResultMatchers.status().isOk());
	}
}
