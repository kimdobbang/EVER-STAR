package com.everstarbackmain.domain.webrtc.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.everstarbackmain.global.exception.CustomException;
import com.everstarbackmain.global.exception.ExceptionResponse;

import io.openvidu.java.client.Connection;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.SessionProperties;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j(topic = "elk")
public class WebRtcService {

	@Value("${openvidu.url}")
	private String OPENVIDU_URL;

	@Value("${openvidu.secret}")
	private String OPENVIDU_SECRET;

	private OpenVidu openvidu;

	@PostConstruct
	public void init() {
		this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
	}

	public String initializeSession(Map<String, Object> params) {
		SessionProperties properties = SessionProperties.fromJson(params).build();
		Session session = null;
		try {
			session = openvidu.createSession(properties);
		} catch (OpenViduJavaClientException | OpenViduHttpException e) {
			throw new ExceptionResponse(CustomException.OPENVIDU_EXCEPTION);
		}
		return session.getSessionId();
	}

	public String createConnection(String sessionId, Map<String, Object> params) {
		Session session = openvidu.getActiveSession(sessionId);
		if (session == null) {
			throw new ExceptionResponse(CustomException.NOT_FOUND_SESSION_EXCEPTION);
		}
		ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
		Connection connection = null;
		try {
			connection = session.createConnection(properties);
		} catch (OpenViduJavaClientException | OpenViduHttpException e) {
			throw new ExceptionResponse(CustomException.OPENVIDU_EXCEPTION);
		}
		return connection.getToken();
	}
}
