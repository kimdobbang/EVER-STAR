package com.everstarbackmain.domain.sse;

import java.io.IOException;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.pet.repository.PetRepository;
import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.global.exception.CustomException;
import com.everstarbackmain.global.exception.ExceptionResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j(topic = "elk")
public class SseService {

	private static final Long TIMEOUT_SEC = 5L * 1000 * 60;
	private final EmitterRepositoryImpl emitterRepository;
	private final PetRepository petRepository;

	@Transactional
	public void updateQuestStatusNotification(User user, Long petId) {
		Pet pet = petRepository.findByUserAndIdAndIsDeleted(user, petId, false)
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_PET_EXCEPTION));
		SseEmitter sseEmitter = emitterRepository.findById(petId);

		log.info("main-server : emitter find");
		if(sseEmitter != null){
			log.info("main-server : emitter 찾기 성공");
			sendToClient(pet, sseEmitter);
		}
	}

	public SseEmitter connect(User user, Long id) {
		Pet pet = petRepository.findByUserAndIdAndIsDeleted(user, id, false).
			orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_PET_EXCEPTION));

		SseEmitter emitter = createEmitter(pet.getId());
		sendToClient(pet, emitter);
		log.info("SseEmitter connected success!");
		return emitter;
	}

	private SseEmitter createEmitter(Long petId) {
		SseEmitter sseEmitter = new SseEmitter(TIMEOUT_SEC);
		emitterRepository.save(petId, sseEmitter);

		sseEmitter.onCompletion(() -> {
			log.info("main-sever: sse completion");
			emitterRepository.deleteByPetId(petId);
			sseEmitter.complete();
		});
		sseEmitter.onTimeout(() -> {
			log.info("main-server: sse timeout");
			emitterRepository.deleteByPetId(petId);
			sseEmitter.complete();
		}); // 시간 초과
		sseEmitter.onError(throwable -> {
			log.info("main-server: sse error");
			emitterRepository.deleteByPetId(petId);
			sseEmitter.complete();
		}); // 오류
		log.info("main-server: sse create Emitter complete");
		return sseEmitter;
	}

	public void sendToClient(Pet pet, SseEmitter sseEmitter) {
		if (sseEmitter != null) {
			try {
				String data = generateDataMessage(pet);
				sseEmitter.send(SseEmitter.event()
					.id(String.valueOf(pet.getId()))
					.data(data, MediaType.APPLICATION_JSON));
				log.info("SseEmitter send message success!");
			} catch (IOException e) {
				emitterRepository.deleteByPetId(pet.getId());
				log.error("main server - error , {}", e.getMessage());
				log.info("SseEmitter send message error!");
			}
		}
	}

	private String generateDataMessage(Pet pet) {
		if (pet.getIsQuestCompleted()) {
			return "퀘스트를 완료했어요.";
		} else if (pet.getQuestIndex() == 50) {
			return "영원별에 메모리얼북이 완성 됐어요.";
		} else {
			log.info("SseEmitter generate message success!");
			return pet.getQuestIndex().toString();
		}
	}
}