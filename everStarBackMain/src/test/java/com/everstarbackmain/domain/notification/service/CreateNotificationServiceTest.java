package com.everstarbackmain.domain.notification.service;

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

import com.everstarbackmain.domain.notification.model.Notification;
import com.everstarbackmain.domain.notification.repository.NotificationRepository;
import com.everstarbackmain.domain.notification.requestdto.NotificationCreateRequestDto;
import com.everstarbackmain.domain.user.model.Gender;
import com.everstarbackmain.domain.user.model.Role;
import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.domain.user.requestDto.JoinRequestDto;
import com.everstarbackmain.global.security.auth.PrincipalDetails;

@ExtendWith(MockitoExtension.class)
public class CreateNotificationServiceTest {

	@InjectMocks
	private NotificationService notificationService;

	@Mock
	private NotificationRepository notificationRepository;

	@Mock
	private Authentication authentication;

	@Mock
	private PrincipalDetails principalDetails;

	private User user;
	private NotificationCreateRequestDto requestDto;
	private Notification notification;

	@BeforeEach
	public void setUp() {
		user = User.signUpUser(new JoinRequestDto("email", "password", "name", "010-1111-1111",
			LocalDate.now(), Gender.MALE, LocalTime.now(), Role.ROLE_USER));

		requestDto = new NotificationCreateRequestDto("TEST");
		notification = new Notification(user, requestDto);
	}

	@Test
	@DisplayName("알림 생성 서비스 성공 테스트 ")

	public void 알림_생성_서비스_성공_테스트() {
		//given
		BDDMockito.given(authentication.getPrincipal()).willReturn(principalDetails);
		BDDMockito.given(principalDetails.getUser()).willReturn(user);

		//when then
		Assertions.assertThatNoException()
			.isThrownBy(() -> notificationService.saveNotification(authentication, requestDto));
	}
}
