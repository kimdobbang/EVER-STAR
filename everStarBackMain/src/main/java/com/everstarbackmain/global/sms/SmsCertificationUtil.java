package com.everstarbackmain.global.sms;

import org.springframework.stereotype.Component;

import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class SmsCertificationUtil {

	private final SmsValueConfig valueConfig;

	public SingleMessageSentResponse sendSms(String to, String petName) {
		Message message = new Message();
		message.setFrom(valueConfig.getSenderNumber());
		message.setTo(to);
		message.setText(petName + "으로 부터 편지가 도착했어요");

		SingleMessageSentResponse response = valueConfig.getMessageService()
			.sendOne(new SingleMessageSendingRequest(message));
		return response;
	}
}
