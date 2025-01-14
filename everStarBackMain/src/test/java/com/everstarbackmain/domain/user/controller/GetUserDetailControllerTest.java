package com.everstarbackmain.domain.user.controller;

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
import org.springframework.security.core.Authentication;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.everstarbackmain.domain.user.model.Gender;
import com.everstarbackmain.domain.user.model.Role;
import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.domain.user.requestDto.JoinRequestDto;
import com.everstarbackmain.domain.user.responseDto.UserDetailResponseDto;
import com.everstarbackmain.domain.user.service.UserService;
import com.everstarbackmain.global.auth.WithMockAuthUser;
import com.everstarbackmain.global.config.SecurityConfig;
import com.everstarbackmain.global.util.HttpResponseUtil;

@WebMvcTest(
	controllers = UserController.class,
	excludeFilters = {
		@ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = SecurityConfig.class)
	}
)
@MockBean(JpaMetamodelMappingContext.class)
public class GetUserDetailControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private UserService userService;

	@MockBean
	private HttpResponseUtil responseUtil;

	@Mock
	private Authentication authentication;

	private User user;

	private UserDetailResponseDto responseDto;

	@BeforeEach
	public void setUp() throws Exception {
		user = User.signUpUser(new JoinRequestDto("email", "password", "name", "010-1111-1111", LocalDate.now(),
			Gender.MALE, LocalTime.now(), Role.ROLE_USER));

		responseDto = UserDetailResponseDto.createUserDetailResponseDto(user);
	}

	@Test
	@DisplayName("유저 정보 조회 성공 테스트")
	@WithMockAuthUser(email = "test@gmail.com", role = Role.ROLE_USER)
	public void 유저_정보_조회_성공_테스트() throws Exception {
		//given
		Map<String, Object> response = new HashMap<>();
		response.put("data", responseDto);
		BDDMockito.given(userService.getUserDetail(authentication)).willReturn(responseDto);
		BDDMockito.given(responseUtil.createResponse(responseDto)).willReturn(ResponseEntity.ok().body(response));

		// when then
		ResultActions resultActions = mockMvc.perform(MockMvcRequestBuilders.get("/api/accounts/users")
			.with(SecurityMockMvcRequestPostProcessors.csrf())
			.contentType(MediaType.APPLICATION_JSON)
		);
		resultActions.andExpect(MockMvcResultMatchers.status().isOk());
	}
}