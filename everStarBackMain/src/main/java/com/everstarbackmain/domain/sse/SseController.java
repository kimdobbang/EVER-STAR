package com.everstarbackmain.domain.sse;

import java.io.IOException;

import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.global.security.auth.PrincipalDetails;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/earth")
@Slf4j(topic = "elk")
public class SseController {

	private final SseService sseService;

	@GetMapping(value = "/connect/{pet-id}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
	public SseEmitter connect(
		@PathVariable(value = "pet-id") Long petId, HttpServletResponse response, Authentication authentication) throws
		IOException {
		SseEmitter sseEmitter = new SseEmitter();
		User user = ((PrincipalDetails)authentication.getPrincipal()).getUser();
		response.setHeader("X-Accel-Buffering", "no");
		sseEmitter.send("data: " + System.currentTimeMillis() + "\n\n");
		log.info("main-server: sse controller connected");
		return sseService.connect(user, petId);
	}

}

