package com.everstarbackmain.domain.sse;

import java.util.Optional;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface EmitterRepository {

	SseEmitter save(Long petId, SseEmitter sseEmitter); // Emitter 저장

	SseEmitter findById(Long petId);  // 해당 동물 관련 Emitter 찾기

	void deleteByPetId(Long petId); // Emitter 삭제
}
