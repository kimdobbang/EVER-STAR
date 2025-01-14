package com.everstarbackmain.global.config;

import java.io.IOException;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import com.everstarbackmain.global.exception.CustomException;
import com.everstarbackmain.global.exception.ExceptionResponse;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j(topic = "elk")
public class NotificationInitializer {

	@PostConstruct
	public void initalize(){
		try {
			GoogleCredentials googleCredentials = GoogleCredentials
				.fromStream(new ClassPathResource(NotificationPathConfig.path.getFcmPath()).getInputStream());
			FirebaseOptions options = new FirebaseOptions.Builder()
				.setCredentials(googleCredentials)
				.build();
			FirebaseApp.initializeApp(options);
		} catch (IOException e) {
			log.error("MAIN SERVER - FCM error message { } : " + e.getMessage());
			throw new ExceptionResponse(CustomException.ACCESS_DENIED_EXCEPTION);
		}
	}
}
