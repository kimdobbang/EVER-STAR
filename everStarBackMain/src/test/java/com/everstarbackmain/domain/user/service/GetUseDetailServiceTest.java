package com.everstarbackmain.domain.user.service;

import java.time.LocalDate;
import java.time.LocalTime;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.BDDMockito;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;

import com.everstarbackmain.domain.user.model.Gender;
import com.everstarbackmain.domain.user.model.Role;
import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.domain.user.repository.UserRepository;
import com.everstarbackmain.domain.user.requestDto.JoinRequestDto;
import com.everstarbackmain.domain.user.responseDto.UserDetailResponseDto;
import com.everstarbackmain.global.security.auth.PrincipalDetails;

@ExtendWith(MockitoExtension.class)
public class GetUseDetailServiceTest {

	@InjectMocks
	private UserService userService;

	@Mock
	private UserRepository userRepository;

	@Mock
	private Authentication authentication;

	@Mock
	private PrincipalDetails principalDetails;

	private User user;

	@BeforeEach
	public void setUp() {
		user = User.signUpUser(new JoinRequestDto("email", "password", "name", "010-1111-1111", LocalDate.now(),
			Gender.MALE, LocalTime.now(), Role.ROLE_USER));
	}

	@Test
	@DisplayName("자기 자신 정보 조회 성공 테스트")
	public void 자기_자신_정보_조회_성공_테스트() {
		// Given
		BDDMockito.given(authentication.getPrincipal()).willReturn(principalDetails);
		BDDMockito.given(principalDetails.getUser()).willReturn(user);

		// When
		UserDetailResponseDto responseDto = userService.getUserDetail(authentication);

		// Then
		Assertions.assertThat(responseDto.getEmail()).isEqualTo(user.getEmail());
	}
}
