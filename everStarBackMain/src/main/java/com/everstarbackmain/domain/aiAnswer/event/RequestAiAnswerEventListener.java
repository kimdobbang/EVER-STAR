package com.everstarbackmain.domain.aiAnswer.event;

import java.util.List;

import org.springframework.context.event.EventListener;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.everstarbackmain.domain.aiAnswer.model.AiAnswer;
import com.everstarbackmain.domain.aiAnswer.model.AiAnswerType;
import com.everstarbackmain.domain.aiAnswer.repository.AiAnswerRepository;
import com.everstarbackmain.domain.aiAnswer.requestdto.CreateAiAnswerRequestDto;
import com.everstarbackmain.domain.notification.util.NotificationUtil;
import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.quest.model.Quest;
import com.everstarbackmain.domain.questAnswer.model.QuestAnswer;
import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.global.diffusionai.util.DiffusionAiClient;
import com.everstarbackmain.global.openai.util.OpenAiClient;
import com.everstarbackmain.global.util.S3UploadUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j(topic = "elk")
public class RequestAiAnswerEventListener {

	private final AiAnswerRepository aiAnswerRepository;
	private final OpenAiClient openAiClient;
	private final NotificationUtil notificationUtil;
	private final S3UploadUtil s3UploadUtil;

	@EventListener
	@Transactional
	@Async
	public void requestTextToTextAiAnswer(RequestTextToTextAiAnswerEvent event) {
		User user = event.getUser();
		Pet pet = event.getPet();
		Quest quest = event.getQuest();
		QuestAnswer questAnswer = event.getQuestAnswer();
		List<String> personalities = event.getPersonalities();

		String aiAnswerResponse = openAiClient.writePetTextToTextAnswer(user, pet, personalities, quest,
			questAnswer);
		AiAnswer aiAnswer = AiAnswer.createAiAnswer(pet, quest,
			CreateAiAnswerRequestDto.createTextAiAnswerRequestDto(aiAnswerResponse,
				AiAnswerType.TEXT.getType()));
		aiAnswerRepository.save(aiAnswer);
	}

	@EventListener
	@Transactional
	@Async
	public void requestTextImageToTextAiAnswer(RequestTextImageToTextAiAnswerEvent event) {
		User user = event.getUser();
		Pet pet = event.getPet();
		Quest quest = event.getQuest();
		QuestAnswer questAnswer = event.getQuestAnswer();
		List<String> personalities = event.getPersonalities();
		String imageUrl = event.getImageUrl();

		String aiAnswerResponse = openAiClient.writePetTextImageToTextAnswer(user, pet, personalities, quest,
			questAnswer, imageUrl);
		AiAnswer aiAnswer = AiAnswer.createAiAnswer(pet, quest,
			CreateAiAnswerRequestDto.createTextAiAnswerRequestDto(aiAnswerResponse,
				AiAnswerType.TEXT.getType()));
		aiAnswerRepository.save(aiAnswer);
	}

	@EventListener
	@Transactional
	@Async
	public void requestTextToImageAiAnswer(RequestTextToImageAiAnswerEvent event) {
		User user = event.getUser();
		Pet pet = event.getPet();
		Quest quest = event.getQuest();
		QuestAnswer questAnswer = event.getQuestAnswer();

		String encodedAiAnswerResponse = openAiClient.writePetTextToImageAnswer(pet, quest, questAnswer);
		String uploadedImageUrl = s3UploadUtil.uploadS3ByEncodedFile(encodedAiAnswerResponse);
		AiAnswer aiAnswer = AiAnswer.createAiAnswer(pet, quest,
			CreateAiAnswerRequestDto.createImageAiAnswerRequestDto(uploadedImageUrl,
				AiAnswerType.IMAGE.getType()));
		aiAnswerRepository.save(aiAnswer);

		notificationUtil.sendImageAiAnswerNotification(user, uploadedImageUrl);
	}

	@EventListener
	@Transactional
	@Async
	public void requestTextImageToImageAiAnswer(RequestTextImageToImageAiAnswerEvent event) {
		User user = event.getUser();
		Pet pet = event.getPet();
		Quest quest = event.getQuest();
		QuestAnswer questAnswer = event.getQuestAnswer();
		String imageUrl = event.getImageUrl();

		String encodedAiAnswerResponse = openAiClient.writePetTextImageToImageAnswer(quest, questAnswer, imageUrl);
		String uploadedImageUrl = s3UploadUtil.uploadS3ByEncodedFile(encodedAiAnswerResponse);
		AiAnswer aiAnswer = AiAnswer.createAiAnswer(pet, quest,
			CreateAiAnswerRequestDto.createImageAiAnswerRequestDto(uploadedImageUrl,
				AiAnswerType.IMAGE.getType()));
		aiAnswerRepository.save(aiAnswer);

		notificationUtil.sendImageAiAnswerNotification(user, uploadedImageUrl);
	}

	private byte[] downloadImage(String imageUrl) {
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<byte[]> response = restTemplate.exchange(imageUrl, HttpMethod.GET, null, byte[].class);
		return response.getBody();
	}
}
