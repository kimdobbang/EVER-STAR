package com.everstarbackauth.domain.sms.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.ArgumentMatchers.anyString;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.BDDMockito;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;

import com.everstarbackauth.domain.sms.repository.SmsCertificationRepository;
import com.everstarbackauth.domain.sms.requestDto.CheckCodeRequestDto;
import com.everstarbackauth.domain.sms.requestDto.SendCodeRequestDto;
import com.everstarbackauth.domain.user.model.Gender;
import com.everstarbackauth.domain.user.model.Role;
import com.everstarbackauth.domain.user.model.User;
import com.everstarbackauth.domain.user.repository.UserRepository;
import com.everstarbackauth.domain.user.requestDto.JoinRequestDto;
import com.everstarbackauth.global.exception.CustomException;
import com.everstarbackauth.global.exception.ExceptionResponse;
import com.everstarbackauth.global.security.auth.PrincipalDetails;
import com.everstarbackauth.global.util.SmsCertificationUtil;

@ExtendWith(MockitoExtension.class)
class SmsServiceTest {

	@Mock
	private SmsCertificationRepository smsCertificationRepository;

	@Mock
	private SmsCertificationUtil smsUtil;

	@Mock
	private UserRepository userRepository;

	@Mock
	private Authentication authentication;

	@Mock
	private PrincipalDetails principalDetails;

	private User user; // 기존 가입된 유저 객체

	@InjectMocks
	private SmsService smsService;

	private SendCodeRequestDto sendCodeRequestDto;
	private CheckCodeRequestDto checkCodeRequestDto;

	@BeforeEach
	public void setUp() {
		user = User.signUpUser(new JoinRequestDto("email", "password", "name", "01020007052", LocalDate.now(),
			Gender.FEMALE, LocalTime.now(), Role.ROLE_USER));

		sendCodeRequestDto = new SendCodeRequestDto();
		sendCodeRequestDto.setPhone("01020007052");

		checkCodeRequestDto = new CheckCodeRequestDto();
		checkCodeRequestDto.setPhone("01020007052");
		checkCodeRequestDto.setCertificationNumber("12345");
	}

	@Test
	@DisplayName("문자전송 성공 테스트")
	void 문자전송_성공() {
		// Given
		given(userRepository.existsUserByPhoneNumber(sendCodeRequestDto.getPhone())).willReturn(false);

		// When
		smsService.sendSms(sendCodeRequestDto);

		// Then
		verify(smsUtil, times(1)).sendSms(anyString(), anyString());
		verify(smsCertificationRepository, times(1)).saveSmsCertification(anyString(), anyString());
	}

	@Test
	@DisplayName("문자인증 성공 테스트")
	void 문자인증_성공() {
		// Given
		given(smsCertificationRepository.getSmsCertification(checkCodeRequestDto.getPhone()))
			.willReturn(checkCodeRequestDto.getCertificationNumber());
		given(smsCertificationRepository.hasKey(checkCodeRequestDto.getPhone())).willReturn(true);

		// When
		smsService.verifySms(checkCodeRequestDto);

		// Then
		verify(smsCertificationRepository, times(1)).deleteSmsCertification(checkCodeRequestDto.getPhone());
	}

	@Test
	@DisplayName("문자전송 거부: 이미 가입된 전화번호 테스트")
	void 문자전송_거부_이미_가입된_전화번호() {
		// Given
		given(userRepository.existsUserByPhoneNumber(sendCodeRequestDto.getPhone())).willReturn(true);

		// Then
		assertThatThrownBy(() -> smsService.sendSms(sendCodeRequestDto))
			.isInstanceOf(ExceptionResponse.class)
			.hasFieldOrPropertyWithValue("customException", CustomException.DUPLICATED_PHONENUMBER_EXCEPTION);
	}

	@Test
	@DisplayName("문자인증 실패: 인증번호 불일치")
	void 문자인증_실패_인증번호_불일치() {
		// Given
		given(smsCertificationRepository.getSmsCertification(checkCodeRequestDto.getPhone()))
			.willReturn("54321");
		given(smsCertificationRepository.hasKey(checkCodeRequestDto.getPhone())).willReturn(true);

		// Then
		assertThatThrownBy(() -> smsService.verifySms(checkCodeRequestDto))
			.isInstanceOf(ExceptionResponse.class)
			.hasFieldOrPropertyWithValue("customException", CustomException.NOT_MATCH_AUTH_CODE_EXCEPTION);
	}

	@Test
	@DisplayName("문자인증 최종로직 성공: 인증번호 일치")
	void testIsVerify_success() {
		// Given
		given(smsCertificationRepository.getSmsCertification(checkCodeRequestDto.getPhone()))
			.willReturn(checkCodeRequestDto.getCertificationNumber());
		given(smsCertificationRepository.hasKey(checkCodeRequestDto.getPhone())).willReturn(true);

		// When
		boolean result = smsService.isVerify(checkCodeRequestDto);

		// Then
		assertThat(result).isTrue();
	}

	@Test
	@DisplayName("문자인증 최종로직 실패: 인증번호 불일치")
	void testIsVerify_fail() {
		// Given
		given(smsCertificationRepository.getSmsCertification(checkCodeRequestDto.getPhone()))
			.willReturn("54321");
		given(smsCertificationRepository.hasKey(checkCodeRequestDto.getPhone())).willReturn(true);

		// When
		boolean result = smsService.isVerify(checkCodeRequestDto);

		// Then
		assertThat(result).isFalse();
	}
}
