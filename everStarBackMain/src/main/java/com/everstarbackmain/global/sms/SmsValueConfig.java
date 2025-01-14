package com.everstarbackmain.global.sms;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.service.DefaultMessageService;

import jakarta.annotation.PostConstruct;
import lombok.Getter;

@Configuration
@Getter
public class SmsValueConfig {

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

}
