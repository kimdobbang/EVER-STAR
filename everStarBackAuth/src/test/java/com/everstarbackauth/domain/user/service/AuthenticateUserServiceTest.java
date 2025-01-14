package com.everstarbackauth.domain.user.service;

import java.time.LocalDate;
import java.time.LocalTime;
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
import org.springframework.security.crypto.password.PasswordEncoder;

import com.everstarbackauth.domain.sms.repository.SmsCertificationRepository;
import com.everstarbackauth.domain.user.model.Gender;
import com.everstarbackauth.domain.user.model.User;
import com.everstarbackauth.domain.user.repository.UserRepository;
import com.everstarbackauth.domain.user.requestDto.AuthenticateUserRequestDto;
import com.everstarbackauth.global.exception.CustomException;
import com.everstarbackauth.global.exception.ExceptionResponse;
import com.everstarbackauth.global.security.jwt.JwtUtil;

import jakarta.servlet.http.HttpServletResponse;

@ExtendWith(MockitoExtension.class)
public class AuthenticateUserServiceTest {

	@InjectMocks
	private JoinService joinService;

	@Mock
	private UserRepository userRepository;

	@Mock
	private PasswordEncoder passwordEncoder;

	@Mock
	private SmsCertificationRepository smsCertificationRepository;

	@Mock
	private JwtUtil jwtUtil;

	@Mock
	private HttpServletResponse httpServletResponse;

	private AuthenticateUserRequestDto requestDto;
	private User user;
	private String accessToken;

	@BeforeEach
	public void setUp() {
		requestDto = new AuthenticateUserRequestDto("test@test.com", "test", "01011111111", LocalDate.now(),
			Gender.MALE,
			LocalTime.now());

		user = User.oAuthSignUpUser(requestDto.getEmail(), requestDto.getEmail());
		accessToken = "adfasdfasfdasfdfasdf";
	}

	@Test
	@DisplayName("OAuth 회원 가입 테스트")
	public void OAuth_회원가입_성공_테스트() {
		//given
		BDDMockito.given(userRepository.findUserByEmailAndIsDeleted(requestDto.getEmail(), false))
			.willReturn(Optional.of(user));
		BDDMockito.given(smsCertificationRepository.existsBySuccessNumber(requestDto.getPhoneNumber()))
			.willReturn(true);
		BDDMockito.given(jwtUtil.getAccessToken(user)).willReturn(accessToken);

		//when
		joinService.authenticateUser(requestDto, httpServletResponse);

		//then
		Assertions.assertThatNoException().isThrownBy(() -> joinService.authenticateUser(requestDto, httpServletResponse));
	}

	@Test
	@DisplayName("OAuth 회원가입 테스트 실패 테스트 유저 존재하지 않음")
	public void OAuth_회원가입_유저_존재하지않음_실패_테스트() {

		Assertions.assertThatThrownBy(() -> joinService.authenticateUser(requestDto, httpServletResponse))
			.isInstanceOf(ExceptionResponse.class)
			.hasFieldOrPropertyWithValue("customException", CustomException.NOT_FOUND_USER_EXCEPTION);
	}

	@Test
	@DisplayName("OAuth 회원가입 테스트 실패 테스트 인증된 번호 존재하지 않음")
	public void OAuth_회원가입_인증된_번호_존재하지않음_실패_테스트() {
		//given
		BDDMockito.given(userRepository.findUserByEmailAndIsDeleted(requestDto.getEmail(), false))
			.willReturn(Optional.of(user));
		BDDMockito.given(smsCertificationRepository.existsBySuccessNumber(requestDto.getPhoneNumber()))
			.willReturn(false);

		//then
		Assertions.assertThatThrownBy(() -> joinService.authenticateUser(requestDto, httpServletResponse))
			.isInstanceOf(ExceptionResponse.class)
			.hasFieldOrPropertyWithValue("customException", CustomException.NOT_AUTH_PHONE_NUMBER);
	}
}
