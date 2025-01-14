package com.everstarbackmain.domain.questAnswer.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.everstarbackmain.domain.aiAnswer.event.RequestTextImageToImageAiAnswerEvent;
import com.everstarbackmain.domain.aiAnswer.event.RequestTextImageToTextAiAnswerEvent;
import com.everstarbackmain.domain.aiAnswer.event.RequestTextToImageAiAnswerEvent;
import com.everstarbackmain.domain.aiAnswer.event.RequestTextToTextAiAnswerEvent;
import com.everstarbackmain.domain.memorialBook.util.MemorialBookScheduler;
import com.everstarbackmain.domain.notification.util.NotificationUtil;
import com.everstarbackmain.domain.pet.repository.PetPersonalityRepository;
import com.everstarbackmain.domain.pet.repository.PetRepository;
import com.everstarbackmain.domain.quest.model.Quest;
import com.everstarbackmain.domain.quest.model.QuestType;
import com.everstarbackmain.domain.quest.repository.QuestRepository;
import com.everstarbackmain.domain.quest.util.QuestScheduler;
import com.everstarbackmain.domain.questAnswer.model.QuestAnswer;
import com.everstarbackmain.domain.questAnswer.model.QuestAnswerTypeNo;
import com.everstarbackmain.domain.questAnswer.requestDto.CreateAnswerRequestDto;
import com.everstarbackmain.domain.sse.SseService;
import com.everstarbackmain.global.openai.util.OpenAiClient;
import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.questAnswer.repository.QuestAnswerRepository;
import com.everstarbackmain.domain.sentimentAnalysis.model.SentimentAnalysis;
import com.everstarbackmain.domain.sentimentAnalysis.model.SentimentAnalysisResult;
import com.everstarbackmain.domain.sentimentAnalysis.repository.SentimentAnalysisRepository;
import com.everstarbackmain.domain.sentimentAnalysis.util.NaverCloudClient;
import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.global.exception.CustomException;
import com.everstarbackmain.global.exception.ExceptionResponse;
import com.everstarbackmain.global.security.auth.PrincipalDetails;
import com.everstarbackmain.global.util.S3UploadUtil;
import com.vane.badwordfiltering.BadWordFiltering;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class QuestAnswerService {

	private final QuestRepository questRepository;
	private final QuestAnswerRepository questAnswerRepository;
	private final PetRepository petRepository;
	private final PetPersonalityRepository petPersonalityRepository;
	private final SentimentAnalysisRepository sentimentAnalysisRepository;
	private final MemorialBookScheduler memorialBookScheduler;
	private final QuestScheduler questScheduler;
	private final NaverCloudClient naverCloudClient;
	private final OpenAiClient openAiClient;
	private final S3UploadUtil s3UploadUtil;
	private final NotificationUtil notificationUtil;
	private final SseService sseService;
	private final ApplicationEventPublisher eventPublisher;

	@Transactional
	public void createQuestAnswer(Authentication authentication, Long petId, Long questId,
		CreateAnswerRequestDto requestDto, MultipartFile imageFile) {
		User user = ((PrincipalDetails)authentication.getPrincipal()).getUser();

		Pet pet = petRepository.findByIdAndUserAndIsDeleted(petId, user, false)
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_PET_EXCEPTION));

		if (!pet.getQuestIndex().equals(questId.intValue())) {
			throw new ExceptionResponse(CustomException.QUEST_INDEX_NOT_MATCH_EXCEPTION);
		}

		if (pet.getIsQuestCompleted()) {
			throw new ExceptionResponse(CustomException.ALREADY_COMPLETED_QUEST_EXCEPTION);
		}

		Quest quest = questRepository.findById(questId)
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_QUEST_EXCEPTION));

		String filteredContent = filterBadWords(requestDto.getContent());

		BadWordFiltering badWordFiltering = new BadWordFiltering();
		boolean test = badWordFiltering.blankCheck(requestDto.getContent());
		if (test) {
           log.info(" 이건 욕이잖아 !! Filtered content: {}", filteredContent);

        }

		if (requestDto.getType().equals(QuestType.TEXT.getType())) {
			QuestAnswer questAnswer = QuestAnswer.createTextQuestAnswer(pet, quest, requestDto, filteredContent);
			questAnswerRepository.save(questAnswer);
			plusPetQuestIndexByTextType(user, pet, quest, questAnswer);
			questScheduler.scheduleNextDayQuest(user, petId);
			return;
		}

		if (requestDto.getType().equals(QuestType.TEXT_IMAGE.getType())) {
			String imageUrl = s3UploadUtil.saveFile(imageFile);
			QuestAnswer questAnswer = QuestAnswer.createTextImageQuestAnswer(pet, quest, requestDto, filteredContent, imageUrl);
			questAnswerRepository.save(questAnswer);
			plusPetQuestIndexByImageType(user, pet, quest, questAnswer, imageUrl, imageFile);
			questScheduler.scheduleNextDayQuest(user, petId);
			return;
		}

		// webRTC
		String imageUrl = s3UploadUtil.saveFile(imageFile);
		QuestAnswer questAnswer = QuestAnswer.createTextImageQuestAnswer(pet, quest, requestDto,filteredContent, imageUrl);
		questAnswerRepository.save(questAnswer);
		plusPetQuestIndexByImageType(user, pet, quest, questAnswer, imageUrl, imageFile);
		questScheduler.scheduleNextDayQuest(user, petId);
	}

	private void plusPetQuestIndexByTextType(User user, Pet pet, Quest quest, QuestAnswer questAnswer) {
		if (pet.getId().equals(2082L)) {
			pet.plusQuestIndexByPresentation();
		} else {
			pet.plusQuestIndex();
		}

		int petQuestIndex = pet.getQuestIndex();
		sseService.updateQuestStatusNotification(user, pet.getId());

		if ((petQuestIndex - 1) % 7 == 0) {
			analyseWeeklyQuestAnswer(pet.getId(), petQuestIndex - 1);
		}

		if (petQuestIndex == 50) {
			memorialBookScheduler.scheduleMemorialBookActivation(user, pet.getId());
			analysisTotalQuestAnswer(pet.getId());
		}

		requestAiAnswerByTextType(user, pet, quest, questAnswer);
	}

	private void plusPetQuestIndexByImageType(User user, Pet pet, Quest quest, QuestAnswer questAnswer, String imageUrl,
		MultipartFile imageFile) {
		if (pet.getId().equals(2082L)) {
			pet.plusQuestIndexByPresentation();
		} else {
			pet.plusQuestIndex();
		}

		int petQuestIndex = pet.getQuestIndex();
		sseService.updateQuestStatusNotification(user, pet.getId());

		if ((petQuestIndex - 1) % 7 == 0) {
			analyseWeeklyQuestAnswer(pet.getId(), petQuestIndex - 1);
		}

		if (petQuestIndex == 50) {
			memorialBookScheduler.scheduleMemorialBookActivation(user, pet.getId());
			analysisTotalQuestAnswer(pet.getId());
		}

		requestAiAnswerByImageType(user, pet, quest, questAnswer, imageUrl, imageFile);
	}

	private void analyseWeeklyQuestAnswer(Long petId, int petQuestIndex) {
		List<String> answerContents = questAnswerRepository.findContentByPetIdAndSpecificQuestIdsAndIsDeleted(petId,
			petQuestIndex - 3, petQuestIndex, false);

		String weeklyAnswerContent = answerContents.parallelStream()
			.collect(Collectors.joining(""));

		SentimentAnalysisResult sentimentAnalysisResult = naverCloudClient.analyseSentiment(weeklyAnswerContent);
		SentimentAnalysis sentimentAnalysis = sentimentAnalysisRepository.findByPetId(petId)
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_SENTIMENT_ANALYSIS_EXCEPTION));

		sentimentAnalysis.addWeekResult(sentimentAnalysisResult.calculateAnalysis(), petQuestIndex / 7);
	}

	private void analysisTotalQuestAnswer(Long petId) {
		SentimentAnalysis sentimentAnalysis = sentimentAnalysisRepository.findByPetId(petId)
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_SENTIMENT_ANALYSIS_EXCEPTION));

		sentimentAnalysis.addTotalResult(openAiClient.analysisTotalSentiment(sentimentAnalysis));
	}

	private void requestAiAnswerByTextType(User user, Pet pet, Quest quest, QuestAnswer questAnswer) {
		Long questId = quest.getId();
		List<String> personalities = petPersonalityRepository.findPersonalityValuesByPetIdAndIsDeleted(
			pet.getId(), false);

		QuestAnswerTypeNo.findTypeByQuestNumber(questId).ifPresentOrElse(type -> {
			if (type.equals(QuestAnswerTypeNo.TEXT_TO_TEXT.getType())) {
				eventPublisher.publishEvent(
					new RequestTextToTextAiAnswerEvent(user, pet, personalities, quest, questAnswer));
			}

			if (type.equals(QuestAnswerTypeNo.TEXT_TO_IMAGE_ART.getType())) {
				eventPublisher.publishEvent(new RequestTextToImageAiAnswerEvent(user, pet, quest, questAnswer));
			}

		}, () -> {
		});
	}

	private void requestAiAnswerByImageType(User user, Pet pet, Quest quest, QuestAnswer questAnswer, String imageUrl,
		MultipartFile imageFile) {
		Long questId = quest.getId();
		List<String> personalities = petPersonalityRepository.findPersonalityValuesByPetIdAndIsDeleted(
			pet.getId(), false);

		QuestAnswerTypeNo.findTypeByQuestNumber(questId).ifPresentOrElse(type -> {
			if (type.equals(QuestAnswerTypeNo.TEXT_IMAGE_TO_TEXT.getType())) {
				eventPublisher.publishEvent(new RequestTextImageToTextAiAnswerEvent(user, pet, personalities, quest,
					questAnswer, imageUrl));
			}

			if (type.equals(QuestAnswerTypeNo.TEXT_IMAGE_TO_IMAGE_ART.getType()) ||
				type.equals(QuestAnswerTypeNo.TEXT_IMAGE_TO_IMAGE_PICTURE.getType())) {
				eventPublisher.publishEvent(
					new RequestTextImageToImageAiAnswerEvent(user, pet, quest, questAnswer, imageUrl));
			}

		}, () -> {
		});
	}

	private String filterBadWords(String content) {
		BadWordFiltering badWordFiltering = new BadWordFiltering();
		return badWordFiltering.change(content, new String[] {"_", "-", "1", " ", ".", "@"});
	}
}
