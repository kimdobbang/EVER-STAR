package com.everstarbackmain.domain.webrtc.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.everstarbackmain.domain.webrtc.service.WebRtcService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sessions")
@Slf4j(topic = "elk")
public class WebRtcController {

	private final WebRtcService webRtcService;

	@PostMapping
	public ResponseEntity<String> initializeSession(@RequestBody(required = false) Map<String, Object> params) {
		String sessionId = webRtcService.initializeSession(params);
		return new ResponseEntity<>(sessionId, HttpStatus.OK);
	}

	@PostMapping("/{sessionId}/connections")
	public ResponseEntity<String> createConnection(@PathVariable("sessionId") String sessionId,
		@RequestBody(required = false) Map<String, Object> params) {
		String token = webRtcService.createConnection(sessionId, params);
		return new ResponseEntity<>(token, HttpStatus.OK);
	}
}
