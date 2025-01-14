package com.everstarbackmain.domain.everstar.service;

import java.util.HashMap;
import java.util.Map;

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
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.everstarbackmain.domain.everstar.controller.EverStarController;
import com.everstarbackmain.domain.petterLetter.controller.PetLetterController;
import com.everstarbackmain.domain.user.model.Role;
import com.everstarbackmain.global.auth.WithMockAuthUser;
import com.everstarbackmain.global.config.SecurityConfig;
import com.everstarbackmain.global.util.HttpResponseUtil;

@WebMvcTest(
	controllers = EverStarController.class,
	excludeFilters = {
		@ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = SecurityConfig.class)
	}
)
@MockBean(JpaMetamodelMappingContext.class)
public class EverStarControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private EverStarService everStarService;

	@MockBean
	private HttpResponseUtil responseUtil;

	@Mock
	private Pageable pageable;

	@Mock
	private Page page;

	@Test
	@DisplayName("펫 이름 검색 성공 테스트")
	@WithMockAuthUser(email = "test@gmail.com", role = Role.ROLE_USER)
	public void 펫_이름_검색_성공_테스트() throws Exception {
		Map<String, Object> response = new HashMap<>();
		BDDMockito.given( everStarService.getPetSearchByName("name", pageable)).willReturn(page);

		response.put("data", everStarService.getPetSearchByName("name", pageable));

		ResultActions result = mockMvc.perform(MockMvcRequestBuilders.get("/api/everstar/pets/search?petname=뚜&page=0&size=10")
			.with(SecurityMockMvcRequestPostProcessors.csrf())
			.contentType(MediaType.APPLICATION_JSON)
		);

		result.andExpect(MockMvcResultMatchers.status().isOk());
	}
}
