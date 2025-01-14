package com.everstarbackauth.domain.sms.requestDto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SendCodeRequestDto {

	@NotBlank(message = "전화번호는 필수 입력 값입니다.")
	@Pattern(regexp = "^010\\d{8}$", message = "휴대폰 번호는는 공백 없이 010으로 시작하는 11자리 숫자만 입력 가능합니다.")
	private String phone;
}
