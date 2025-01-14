package com.everstarbackauth.domain.user.controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashMap;
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
import org.springframework.http.ResponseEntity;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.everstarbackauth.auth.WithMockAuthUser;
import com.everstarbackauth.domain.user.model.Gender;
import com.everstarbackauth.domain.user.model.Role;
import com.everstarbackauth.domain.user.requestDto.AuthenticateUserRequestDto;
import com.everstarbackauth.domain.user.responseDto.JoinResponseMessage;
import com.everstarbackauth.domain.user.service.JoinService;
import com.everstarbackauth.global.config.SecurityConfig;
import com.everstarbackauth.global.util.HttpResponseUtil;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletResponse;

@WebMvcTest(
	controllers = JoinController.class,
	excludeFilters = {
		@ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = SecurityConfig.class)
	}
)
@MockBean(JpaMetamodelMappingContext.class)
public class AuthenticateUserControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper;

	@MockBean
	private JoinService joinService;

	@MockBean
	private HttpResponseUtil httpResponseUtil;

	@Mock
	private HttpServletResponse httpServletResponse;

	private AuthenticateUserRequestDto requestDto;

	@BeforeEach
	public void setUp() throws Exception {
		requestDto = new AuthenticateUserRequestDto("test@test.com", "test", "01011111111", LocalDate.now(),
			Gender.MALE,
			LocalTime.now());
	}

	@Test
	@DisplayName("OAuth 회원 가입 테스트")
	@WithMockAuthUser(email = "test@gmail.com", role = Role.ROLE_USER)
	public void OAuth_회원가입_성공_테스트() throws Exception {

		//given
		String requestBody = objectMapper.writeValueAsString(requestDto);
		Map<String, Object> mockResponseData = new HashMap<>();

		BDDMockito.doNothing().when(joinService).authenticateUser(requestDto, httpServletResponse);
		BDDMockito.given(httpResponseUtil.createResponse(equals(JoinResponseMessage.SUCCESS_SIGNUP)))
			.willReturn(ResponseEntity.ok().body(mockResponseData));

		ResultActions result = mockMvc.perform(MockMvcRequestBuilders.put("/api/auth/oauth/join")
			.with(SecurityMockMvcRequestPostProcessors.csrf())
			.contentType(MediaType.APPLICATION_JSON)
			.content(requestBody));

		result.andExpect(MockMvcResultMatchers.status().isOk());
	}

}
