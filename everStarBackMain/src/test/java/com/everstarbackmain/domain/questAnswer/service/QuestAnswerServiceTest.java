package com.everstarbackmain.domain.questAnswer.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.security.core.Authentication;
import org.springframework.test.context.event.ApplicationEvents;
import org.springframework.test.context.event.RecordApplicationEvents;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.multipart.MultipartFile;

import com.everstarbackmain.domain.aiAnswer.event.RequestTextImageToTextAiAnswerEvent;
import com.everstarbackmain.domain.aiAnswer.event.RequestTextToImageAiAnswerEvent;
import com.everstarbackmain.domain.aiAnswer.event.RequestTextToTextAiAnswerEvent;
import com.everstarbackmain.domain.aiAnswer.repository.AiAnswerRepository;
import com.everstarbackmain.domain.memorialBook.model.MemorialBook;
import com.everstarbackmain.domain.memorialBook.util.MemorialBookScheduler;
import com.everstarbackmain.domain.notification.util.NotificationUtil;
import com.everstarbackmain.domain.pet.repository.PetPersonalityRepository;
import com.everstarbackmain.domain.pet.repository.PetRepository;
import com.everstarbackmain.domain.quest.model.Quest;
import com.everstarbackmain.domain.quest.model.QuestType;
import com.everstarbackmain.domain.quest.repository.QuestRepository;
import com.everstarbackmain.domain.quest.util.QuestScheduler;
import com.everstarbackmain.domain.questAnswer.model.QuestAnswer;
import com.everstarbackmain.domain.questAnswer.model.QuestAnswerType;
import com.everstarbackmain.domain.questAnswer.model.QuestAnswerTypeNo;
import com.everstarbackmain.domain.questAnswer.requestDto.CreateAnswerRequestDto;
import com.everstarbackmain.domain.sse.SseService;
import com.everstarbackmain.global.diffusionai.util.DiffusionAiClient;
import com.everstarbackmain.global.openai.util.OpenAiClient;
import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.pet.model.PetGender;
import com.everstarbackmain.domain.pet.requestdto.CreatePetRequestDto;
import com.everstarbackmain.domain.questAnswer.repository.QuestAnswerRepository;
import com.everstarbackmain.domain.sentimentAnalysis.model.SentimentAnalysis;
import com.everstarbackmain.domain.sentimentAnalysis.model.SentimentAnalysisResult;
import com.everstarbackmain.domain.sentimentAnalysis.repository.SentimentAnalysisRepository;
import com.everstarbackmain.domain.sentimentAnalysis.util.NaverCloudClient;
import com.everstarbackmain.domain.user.model.Gender;
import com.everstarbackmain.domain.user.model.Role;
import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.domain.user.requestDto.JoinRequestDto;
import com.everstarbackmain.global.exception.CustomException;
import com.everstarbackmain.global.exception.ExceptionResponse;
import com.everstarbackmain.global.security.auth.PrincipalDetails;
import com.everstarbackmain.global.util.S3UploadUtil;

@ExtendWith(MockitoExtension.class)
@RecordApplicationEvents
class QuestAnswerServiceTest {

	@InjectMocks
	private QuestAnswerService questAnswerService;

	@Mock
	private QuestRepository questRepository;

	@Mock
	private PetRepository petRepository;

	@Mock
	private PetPersonalityRepository petPersonalityRepository;

	@Mock
	private MemorialBookScheduler memorialBookScheduler;

	@Mock
	private QuestAnswerRepository questAnswerRepository;

	@Mock
	private AiAnswerRepository aiAnswerRepository;

	@Mock
	private SentimentAnalysisRepository sentimentAnalysisRepository;

	@Mock
	private NaverCloudClient naverCloudClient;

	@Mock
	private OpenAiClient openAiClient;

	@Mock
	private DiffusionAiClient diffusionAiClient;

	@Mock
	private S3UploadUtil s3UploadUtil;

	@Mock
	private TaskScheduler taskScheduler;

	@Mock
	private Authentication authentication;

	@Mock
	private PrincipalDetails principalDetails;

	@Mock
	private QuestScheduler questScheduler;

	@Mock
	private NotificationUtil notificationUtil;

	@Mock
	private ApplicationEventPublisher applicationEventPublisher;

	@Mock
	private SseService sseService;

	private User user;
	private Pet pet;
	private List<String> petPersonalities;
	private MemorialBook memorialBook;
	private SentimentAnalysis sentimentAnalysis;
	private SentimentAnalysisResult sentimentAnalysisResult;
	private Quest quest;
	private CreateAnswerRequestDto createAnswerRequestDto;
	private CreateAnswerRequestDto createTextAnswerRequestDto;
	private QuestAnswer textQuestAnswer;
	private QuestAnswer textImageToTextAnswer;

	@BeforeEach
	public void setup() {
		user = User.signUpUser(new JoinRequestDto("email", "password", "name", "010-1111-1111",
			LocalDate.now(), Gender.MALE, LocalTime.now(), Role.ROLE_USER));
		pet = Pet.createPet(user, new CreatePetRequestDto("petName", 10,
			LocalDate.of(1990, 1, 1), "species", PetGender.MALE,
			"relationship", List.of("개구쟁이", "귀염둥이")), "profileImageUrl");
		petPersonalities = List.of("개구쟁이, 귀염둥이");
		memorialBook = MemorialBook.createMemorialBook(pet);
		sentimentAnalysis = SentimentAnalysis.createSentimentAnalysis(pet);
		sentimentAnalysisResult = SentimentAnalysisResult.createSentimentAnalysisResult(0.1, 0.3, 0.6);
		quest = new Quest("content", QuestType.TEXT);
		createAnswerRequestDto = new CreateAnswerRequestDto("content", QuestAnswerType.TEXT_IMAGE.getType());
		createTextAnswerRequestDto = new CreateAnswerRequestDto("content", QuestAnswerType.TEXT.getType());
		textQuestAnswer = QuestAnswer.createTextQuestAnswer(pet, quest, createTextAnswerRequestDto,"flteredContent");
		textImageToTextAnswer = QuestAnswer.createTextImageQuestAnswer(pet, quest, createAnswerRequestDto, "flteredContent","imageUrl");


		ReflectionTestUtils.setField(pet, "id", 1L);
	}

	@Test
	@DisplayName("퀘스트_49일차_답변_생성_후_스케줄링_메서드_호출_테스트")
	public void 퀘스트_49일차_답변_생성_후_스케줄링_메서드_호출_테스트() {
		// given
		for (int i = 0; i < 48; i++) {
			pet.plusQuestIndex();
		}
		pet.setFalseIsQuestCompleted();
		MultipartFile imageFile = Mockito.mock(MultipartFile.class);
		given(authentication.getPrincipal()).willReturn(principalDetails);
		given(principalDetails.getUser()).willReturn(user);
		given(petRepository.findByIdAndUserAndIsDeleted(anyLong(), any(), anyBoolean())).willReturn(Optional.of(pet));
		given(sentimentAnalysisRepository.findByPetId(anyLong())).willReturn(Optional.of(sentimentAnalysis));
		given(naverCloudClient.analyseSentiment(anyString())).willReturn(Optional.of(sentimentAnalysisResult).get());
		given(questRepository.findById(anyLong())).willReturn(Optional.of(quest));

		// when
		questAnswerService.createQuestAnswer(authentication, 1L, 49L, createTextAnswerRequestDto, null);

		// then
		verify(memorialBookScheduler).scheduleMemorialBookActivation(user, 1L);
	}

	@Test
	@DisplayName("퀘스트_답변_분석_메서드_호출_테스트")
	public void 퀘스트_답변_분석_메서드_호출_테스트() {
		// given
		for (int i = 0; i < 6; i++) {
			pet.plusQuestIndex();
		}
		pet.setFalseIsQuestCompleted();
		MultipartFile imageFile = Mockito.mock(MultipartFile.class);
		SentimentAnalysis sentimentAnalysis = mock(SentimentAnalysis.class);
		given(authentication.getPrincipal()).willReturn(principalDetails);
		given(principalDetails.getUser()).willReturn(user);
		given(petRepository.findByIdAndUserAndIsDeleted(anyLong(), any(), anyBoolean())).willReturn(Optional.of(pet));
		given(questAnswerRepository.findContentByPetIdAndSpecificQuestIdsAndIsDeleted(anyLong(), anyInt(), anyInt(),
			anyBoolean()))
			.willReturn(List.of("answer1", "answer2", "answer3", "answer4", "answer5", "answer6", "answer7"));
		given(naverCloudClient.analyseSentiment(anyString()))
			.willReturn(SentimentAnalysisResult.createSentimentAnalysisResult(0.1, 0.2, 0.7));
		given(sentimentAnalysisRepository.findByPetId(anyLong()))
			.willReturn(Optional.of(sentimentAnalysis));
		given(questRepository.findById(anyLong())).willReturn(Optional.of(quest));

		// when
		questAnswerService.createQuestAnswer(authentication, 1L, 7L, createAnswerRequestDto, imageFile);

		// then
		verify(naverCloudClient, times(1)).analyseSentiment(anyString());
		verify(sentimentAnalysisRepository, times(1)).findByPetId(anyLong());
		verify(sentimentAnalysis, times(1)).addWeekResult(anyDouble(), eq(1));
		assertNotNull(sentimentAnalysis.getWeek1Result());
	}

	@Test
	@DisplayName("네이버_감정분석_API_예외_처리_테스트")
	public void 네이버_감정분석_API_예외_처리_테스트() {
		// given
		for (int i = 0; i < 6; i++) {
			pet.plusQuestIndex();
		}
		pet.setFalseIsQuestCompleted();

		MultipartFile imageFile = Mockito.mock(MultipartFile.class);
		given(authentication.getPrincipal()).willReturn(principalDetails);
		given(principalDetails.getUser()).willReturn(user);
		given(petRepository.findByIdAndUserAndIsDeleted(anyLong(), any(), anyBoolean())).willReturn(Optional.of(pet));
		given(questAnswerRepository.findContentByPetIdAndSpecificQuestIdsAndIsDeleted(anyLong(), anyInt(), anyInt(),
			anyBoolean()))
			.willReturn(List.of("answer1", "answer2", "answer3", "answer4", "answer5", "answer6", "answer7"));
		given(naverCloudClient.analyseSentiment(anyString()))
			.willThrow(new ExceptionResponse(CustomException.NAVER_SENTIMENT_API_EXCEPTION));
		given(questRepository.findById(anyLong())).willReturn(Optional.of(quest));

		// when
		ExceptionResponse exceptionResponse = assertThrows(ExceptionResponse.class, () -> {
			questAnswerService.createQuestAnswer(authentication, 1L, 7L, createAnswerRequestDto, imageFile);
		});

		// then
		assertEquals(CustomException.NAVER_SENTIMENT_API_EXCEPTION, exceptionResponse.getCustomException());
	}

	@Test
	@DisplayName("감정분석_NOT_FOUND_예외_처리_테스트")
	public void 감정분석_NOT_FOUND_예외_처리_테스트() {
		// given
		for (int i = 0; i < 6; i++) {
			pet.plusQuestIndex();
		}
		pet.setFalseIsQuestCompleted();
		MultipartFile imageFile = Mockito.mock(MultipartFile.class);
		given(authentication.getPrincipal()).willReturn(principalDetails);
		given(principalDetails.getUser()).willReturn(user);
		given(petRepository.findByIdAndUserAndIsDeleted(anyLong(), any(), anyBoolean())).willReturn(Optional.of(pet));
		given(questAnswerRepository.findContentByPetIdAndSpecificQuestIdsAndIsDeleted(anyLong(), anyInt(), anyInt(),
			anyBoolean()))
			.willReturn(List.of("answer1", "answer2", "answer3", "answer4", "answer5", "answer6", "answer7"));
		given(naverCloudClient.analyseSentiment(anyString()))
			.willReturn(SentimentAnalysisResult.createSentimentAnalysisResult(0.1, 0.2, 0.7));
		given(sentimentAnalysisRepository.findByPetId(anyLong()))
			.willReturn(Optional.empty());
		given(questRepository.findById(anyLong())).willReturn(Optional.of(quest));

		// when
		ExceptionResponse exceptionResponse = assertThrows(ExceptionResponse.class, () -> {
			questAnswerService.createQuestAnswer(authentication, 1L, 7L, createAnswerRequestDto, imageFile);
		});

		// then
		assertEquals(CustomException.NOT_FOUND_SENTIMENT_ANALYSIS_EXCEPTION, exceptionResponse.getCustomException());
	}

	@Test
	@DisplayName("퀘스트_49일차_답변_생성_후_OPENAI_API_메서드_호출_테스트")
	public void 퀘스트_49일차_답변_생성_후_OPENAI_API_메서드_호출_테스트() {
		// given
		for (int i = 0; i < 48; i++) {
			pet.plusQuestIndex();
		}
		pet.setFalseIsQuestCompleted();
		given(authentication.getPrincipal()).willReturn(principalDetails);
		given(principalDetails.getUser()).willReturn(user);
		given(petRepository.findByIdAndUserAndIsDeleted(anyLong(), any(), anyBoolean())).willReturn(Optional.of(pet));
		given(sentimentAnalysisRepository.findByPetId(anyLong())).willReturn(Optional.of(sentimentAnalysis));
		given(naverCloudClient.analyseSentiment(anyString())).willReturn(Optional.of(sentimentAnalysisResult).get());
		given(questRepository.findById(anyLong())).willReturn(Optional.of(quest));

		// when
		questAnswerService.createQuestAnswer(authentication, 1L, 49L, createTextAnswerRequestDto, null);

		// then
		verify(openAiClient).analysisTotalSentiment(sentimentAnalysis);
	}

	@Test
	@DisplayName("퀘스트_49일차_답변_생성_후_OPENAI_API_EXCEPTION_발생_테스트")
	public void 퀘스트_49일차_답변_생성_후_OPENAI_API_EXCEPTION_발생_테스트() {
		// given
		for (int i = 0; i < 48; i++) {
			pet.plusQuestIndex();
		}
		pet.setFalseIsQuestCompleted();

		given(authentication.getPrincipal()).willReturn(principalDetails);
		given(principalDetails.getUser()).willReturn(user);
		given(petRepository.findByIdAndUserAndIsDeleted(anyLong(), any(), anyBoolean())).willReturn(Optional.of(pet));
		given(sentimentAnalysisRepository.findByPetId(anyLong())).willReturn(Optional.of(sentimentAnalysis));
		given(naverCloudClient.analyseSentiment(anyString())).willReturn(Optional.of(sentimentAnalysisResult).get());
		given(openAiClient.analysisTotalSentiment(any(SentimentAnalysis.class)))
			.willThrow(new ExceptionResponse(CustomException.OPENAI_API_EXCEPTION));
		given(questRepository.findById(anyLong())).willReturn(Optional.of(quest));

		// when
		ExceptionResponse exceptionResponse = assertThrows(ExceptionResponse.class, () -> {
			questAnswerService.createQuestAnswer(authentication, 1L, 49L, createTextAnswerRequestDto, null);
		});

		// then
		assertEquals(CustomException.OPENAI_API_EXCEPTION, exceptionResponse.getCustomException());
	}

	@Test
	@DisplayName("퀘스트_답변_생성_후_TEXT_TO_TEXT_타입일_경우_관련_이벤트_발행_테스트")
	public void 퀘스트_답변_생성_후_TEXT_TO_TEXT_타입일_경우_관련_이벤트_발행_테스트() {
		given(authentication.getPrincipal()).willReturn(principalDetails);
		given(principalDetails.getUser()).willReturn(user);
		given(petRepository.findByIdAndUserAndIsDeleted(anyLong(), any(), anyBoolean())).willReturn(Optional.of(pet));
		given(questRepository.findById(anyLong())).willReturn(Optional.of(quest));
		given(petPersonalityRepository.findPersonalityValuesByPetIdAndIsDeleted(anyLong(), anyBoolean())).willReturn(
			petPersonalities);
		ReflectionTestUtils.setField(quest, "id", 2L);
		ReflectionTestUtils.setField(pet, "questIndex", 2);
		ReflectionTestUtils.setField(pet, "isQuestCompleted", false);

		try (MockedStatic<QuestAnswerTypeNo> questAnswerTypeNoMock = mockStatic(QuestAnswerTypeNo.class);
			 MockedStatic<QuestAnswer> questAnswerMock = mockStatic(QuestAnswer.class)) {

			questAnswerTypeNoMock.when(() -> QuestAnswerTypeNo.findTypeByQuestNumber(2L))
				.thenReturn(Optional.of(QuestAnswerTypeNo.TEXT_TO_TEXT.getType()));

			questAnswerMock.when(() -> QuestAnswer.createTextQuestAnswer(any(), any(), any(), any()))
				.thenReturn(textQuestAnswer);

			// when
			questAnswerService.createQuestAnswer(authentication, 1L, 2L, createTextAnswerRequestDto, null);

			// then
			verify(applicationEventPublisher).publishEvent(any(RequestTextToTextAiAnswerEvent.class));
		}
	}

	@Test
	@DisplayName("퀘스트_답변_생성_후_TEXT_IMAGE_TO_TEXT_타입일_경우_관련_이벤트_발행_테스트")
	public void 퀘스트_답변_생성_후_TEXT_IMAGE_TO_TEXT_타입일_경우_관련_이벤트_발행_테스트() {
		MultipartFile imageFile = Mockito.mock(MultipartFile.class);
		given(authentication.getPrincipal()).willReturn(principalDetails);
		given(principalDetails.getUser()).willReturn(user);
		given(petRepository.findByIdAndUserAndIsDeleted(anyLong(), any(), anyBoolean())).willReturn(Optional.of(pet));
		given(questRepository.findById(anyLong())).willReturn(Optional.of(quest));
		given(petPersonalityRepository.findPersonalityValuesByPetIdAndIsDeleted(anyLong(), anyBoolean())).willReturn(
			petPersonalities);
		given(s3UploadUtil.saveFile(any())).willReturn("imageUrl");
		ReflectionTestUtils.setField(quest, "id", 37L);
		ReflectionTestUtils.setField(pet, "questIndex", 37);
		ReflectionTestUtils.setField(pet, "isQuestCompleted", false);

		try (MockedStatic<QuestAnswerTypeNo> questAnswerTypeNoMock = mockStatic(QuestAnswerTypeNo.class);
			 MockedStatic<QuestAnswer> questAnswerMock = mockStatic(QuestAnswer.class)) {

			questAnswerTypeNoMock.when(() -> QuestAnswerTypeNo.findTypeByQuestNumber(37L))
				.thenReturn(Optional.of(QuestAnswerTypeNo.TEXT_IMAGE_TO_TEXT.getType()));

			questAnswerMock.when(() -> QuestAnswer.createTextImageQuestAnswer(any(), any(), any(), anyString(), anyString()))
				.thenReturn(textImageToTextAnswer);

			// when
			questAnswerService.createQuestAnswer(authentication, 1L, 37L, createAnswerRequestDto, imageFile);

			// then
			verify(applicationEventPublisher).publishEvent(any(RequestTextImageToTextAiAnswerEvent.class));
		}
	}

	@Test
	@DisplayName("퀘스트_답변_생성_후_TEXT_TO_IMAGE_ART_타입일_경우_관련_이벤트_발행_테스트")
	public void 퀘스트_답변_생성_후_TEXT_TO_IMAGE_ART_타입일_경우_관련_이벤트_발행_테스트() {
		given(authentication.getPrincipal()).willReturn(principalDetails);
		given(principalDetails.getUser()).willReturn(user);
		given(petRepository.findByIdAndUserAndIsDeleted(anyLong(), any(), anyBoolean())).willReturn(Optional.of(pet));
		given(questRepository.findById(anyLong())).willReturn(Optional.of(quest));
		given(petPersonalityRepository.findPersonalityValuesByPetIdAndIsDeleted(anyLong(), anyBoolean())).willReturn(
			petPersonalities);
		ReflectionTestUtils.setField(quest, "id", 44L);
		ReflectionTestUtils.setField(pet, "questIndex", 44);
		ReflectionTestUtils.setField(pet, "isQuestCompleted", false);

		try (MockedStatic<QuestAnswerTypeNo> questAnswerTypeNoMock = mockStatic(QuestAnswerTypeNo.class);
			 MockedStatic<QuestAnswer> questAnswerMock = mockStatic(QuestAnswer.class)) {

			questAnswerTypeNoMock.when(() -> QuestAnswerTypeNo.findTypeByQuestNumber(44L))
				.thenReturn(Optional.of(QuestAnswerTypeNo.TEXT_TO_IMAGE_ART.getType()));

			questAnswerMock.when(() -> QuestAnswer.createTextImageQuestAnswer(any(), any(), any(),  anyString(), anyString()))
				.thenReturn(textQuestAnswer);

			// when
			questAnswerService.createQuestAnswer(authentication, 1L, 44L, createTextAnswerRequestDto, null);

			// then
			verify(applicationEventPublisher).publishEvent(any(RequestTextToImageAiAnswerEvent.class));
		}
	}

}