package com.everstarbackmain.domain.notification.model;

import com.everstarbackmain.domain.notification.requestdto.NotificationCreateRequestDto;
import com.everstarbackmain.domain.user.model.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "notification")
public class Notification {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	@Column(nullable = false)
	private String deviceToken;

	public Notification(User user, NotificationCreateRequestDto requestDto) {
		this.user = user;
		this.deviceToken = requestDto.getDeviceToken();
	}

	public void updateDeviceToken(String deviceToken) {
		this.deviceToken = deviceToken;
	}
}
