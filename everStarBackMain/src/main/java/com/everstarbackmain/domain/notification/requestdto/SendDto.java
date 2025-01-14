package com.everstarbackmain.domain.notification.requestdto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SendDto {
	private String title;

	private String body;

	@Builder
	private SendDto(String title, String body) {
		this.title = title;
		this.body = body;
	}
}