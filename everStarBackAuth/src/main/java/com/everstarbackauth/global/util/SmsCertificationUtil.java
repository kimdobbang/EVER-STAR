package com.everstarbackauth.global.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;

import jakarta.annotation.PostConstruct;

@Component
public class SmsCertificationUtil {

	@Value("${sms.sms-provider}")
	private String senderNumber;

	@Value("${sms.api-key}")
	private String apiKey;

	@Value("${sms.api-secret}")
	private String apiSecret;

	private DefaultMessageService messageService;

	@PostConstruct
	public void init() {
		this.messageService = NurigoApp.INSTANCE.initialize(apiKey, apiSecret, "https://api.coolsms.co.kr");
	}

	public SingleMessageSentResponse sendSms(String to, String verificationCode) {
		Message message = new Message();
		message.setFrom(senderNumber);
		message.setTo(to);
		message.setText("[영원별] 아래의 본인 확인 인증번호를 입력하세요 \n인증번호는 " + verificationCode + "입니다.");

		SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
		return response;
	}
}
