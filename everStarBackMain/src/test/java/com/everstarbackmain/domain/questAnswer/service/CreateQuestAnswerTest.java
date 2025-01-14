package com.everstarbackmain.domain.questAnswer.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyBoolean;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.*;
import static org.mockito.Mockito.times;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.BDDMockito;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.security.core.Authentication;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.multipart.MultipartFile;

import com.everstarbackmain.domain.aiAnswer.repository.AiAnswerRepository;
import com.everstarbackmain.domain.memorialBook.util.MemorialBookScheduler;
import com.everstarbackmain.domain.notification.util.NotificationUtil;
import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.pet.model.PetGender;
import com.everstarbackmain.domain.pet.repository.PetPersonalityRepository;
import com.everstarbackmain.domain.pet.repository.PetRepository;
import com.everstarbackmain.domain.pet.requestdto.CreatePetRequestDto;
import com.everstarbackmain.domain.quest.model.Quest;
import com.everstarbackmain.domain.quest.model.QuestType;
import com.everstarbackmain.domain.quest.repository.QuestRepository;
import com.everstarbackmain.domain.quest.util.QuestScheduler;
import com.everstarbackmain.domain.questAnswer.model.QuestAnswer;
import com.everstarbackmain.domain.questAnswer.model.QuestAnswerType;
import com.everstarbackmain.domain.questAnswer.repository.QuestAnswerRepository;
import com.everstarbackmain.domain.questAnswer.requestDto.CreateAnswerRequestDto;
import com.everstarbackmain.domain.sentimentAnalysis.repository.SentimentAnalysisRepository;
import com.everstarbackmain.domain.sentimentAnalysis.util.NaverCloudClient;
import com.everstarbackmain.domain.sse.SseService;
import com.everstarbackmain.domain.user.model.Gender;
import com.everstarbackmain.domain.user.model.Role;
import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.domain.user.requestDto.JoinRequestDto;
import com.everstarbackmain.global.diffusionai.util.DiffusionAiClient;
import com.everstarbackmain.global.exception.CustomException;
import com.everstarbackmain.global.exception.ExceptionResponse;
import com.everstarbackmain.global.openai.util.OpenAiClient;
import com.everstarbackmain.global.security.auth.PrincipalDetails;
import com.everstarbackmain.global.util.S3UploadUtil;

@ExtendWith(MockitoExtension.class)
public class CreateQuestAnswerTest {

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
	private SseService sseService;

	private User user;
	private Pet pet;
	private Quest quest;
	private CreateAnswerRequestDto createAnswerRequestDto;
	private QuestAnswer questAnswer;

	@BeforeEach
	public void setup() {
		user = User.signUpUser(new JoinRequestDto("email", "password", "name", "010-1111-1111",
			LocalDate.now(), Gender.MALE, LocalTime.now(), Role.ROLE_USER));
		pet = Pet.createPet(user, new CreatePetRequestDto("petName", 10,
			LocalDate.of(1990, 1, 1), "species", PetGender.MALE,
			"relationship", List.of("개구쟁이", "귀염둥이")), "profileImageUrl");
		quest = new Quest("content", QuestType.TEXT);
		createAnswerRequestDto = new CreateAnswerRequestDto("content", QuestAnswerType.TEXT_IMAGE.getType());
		questAnswer = QuestAnswer.createTextImageQuestAnswer(pet, quest, createAnswerRequestDto, "flteredContent","imageUrl");

		ReflectionTestUtils.setField(pet, "id", 1L);
	}

	@Test
	@DisplayName("퀘스트_답변_생성_성공_테스트")
	public void 퀘스트_답변_생성_성공_테스트() {
		// given
		MultipartFile imageFile = Mockito.mock(MultipartFile.class);
		given(authentication.getPrincipal()).willReturn(principalDetails);
		given(principalDetails.getUser()).willReturn(user);
		given(petRepository.findByIdAndUserAndIsDeleted(1L, user, false)).willReturn(Optional.of(pet));
		given(questRepository.findById(anyLong())).willReturn(Optional.of(quest));
		given(s3UploadUtil.saveFile(any())).willReturn("imageUrl");

		// when
		questAnswerService.createQuestAnswer(authentication, 1L, 1L, createAnswerRequestDto, imageFile);

		// then
		BDDMockito.then(questAnswerRepository).should(times(1)).save(any(QuestAnswer.class));
		BDDMockito.then(s3UploadUtil).should(times(1)).saveFile(imageFile);
	}

	@Test
	@DisplayName("퀘스트_답변_생성_퀘스트_없음_예외_테스트")
	public void 퀘스트_답변_생성_퀘스트_없음_예외_테스트() {
		// given
		MultipartFile imageFile = Mockito.mock(MultipartFile.class);
		given(authentication.getPrincipal()).willReturn(principalDetails);
		given(principalDetails.getUser()).willReturn(user);
		given(petRepository.findByIdAndUserAndIsDeleted(1L, user, false)).willReturn(Optional.of(pet));
		given(questRepository.findById(anyLong())).willReturn(Optional.empty());

		// when
		ExceptionResponse exceptionResponse = assertThrows(ExceptionResponse.class, () -> {
			questAnswerService.createQuestAnswer(authentication, 1L, 1L, createAnswerRequestDto, imageFile);
		});

		// then
		assertEquals(CustomException.NOT_FOUND_QUEST_EXCEPTION, exceptionResponse.getCustomException());
	}
}
