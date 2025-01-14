package com.everstarbackmain.domain.memorialBook.service;

import static org.mockito.ArgumentMatchers.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.BDDMockito;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.test.util.ReflectionTestUtils;

import com.everstarbackmain.domain.aiAnswer.model.AiAnswer;
import com.everstarbackmain.domain.aiAnswer.repository.AiAnswerRepository;
import com.everstarbackmain.domain.aiAnswer.requestdto.CreateAiAnswerRequestDto;
import com.everstarbackmain.domain.diary.model.Diary;
import com.everstarbackmain.domain.diary.repository.DiaryRepository;
import com.everstarbackmain.domain.diary.requestDto.CreateDiaryRequestDto;
import com.everstarbackmain.domain.memorialBook.model.MemorialBook;
import com.everstarbackmain.domain.memorialBook.repository.MemorialBookRepository;
import com.everstarbackmain.domain.memorialBook.responsedto.MemorialBookDetailResponseDto;
import com.everstarbackmain.domain.memorialBook.responsedto.MemorialBookInfoResponseDto;
import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.pet.model.PetGender;
import com.everstarbackmain.domain.pet.repository.PetRepository;
import com.everstarbackmain.domain.pet.requestdto.CreatePetRequestDto;
import com.everstarbackmain.domain.quest.model.Quest;
import com.everstarbackmain.domain.quest.model.QuestType;
import com.everstarbackmain.domain.quest.repository.QuestRepository;
import com.everstarbackmain.domain.questAnswer.model.QuestAnswer;
import com.everstarbackmain.domain.questAnswer.repository.QuestAnswerRepository;
import com.everstarbackmain.domain.questAnswer.requestDto.CreateAnswerRequestDto;
import com.everstarbackmain.domain.sentimentAnalysis.model.SentimentAnalysis;
import com.everstarbackmain.domain.sentimentAnalysis.repository.SentimentAnalysisRepository;
import com.everstarbackmain.domain.user.model.Gender;
import com.everstarbackmain.domain.user.model.Role;
import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.domain.user.requestDto.JoinRequestDto;
import com.everstarbackmain.global.exception.CustomException;
import com.everstarbackmain.global.exception.ExceptionResponse;
import com.everstarbackmain.global.security.auth.PrincipalDetails;

@ExtendWith(MockitoExtension.class)
public class GetMemorialBookServiceTest {

	@InjectMocks
	private MemorialBookService memorialBookService;

	@Mock
	private MemorialBookRepository memorialBookRepository;

	@Mock
	private PetRepository petRepository;

	@Mock
	private SentimentAnalysisRepository sentimentAnalysisRepository;

	@Mock
	private QuestRepository questRepository;

	@Mock
	private QuestAnswerRepository questAnswerRepository;

	@Mock
	private AiAnswerRepository aiAnswerRepository;

	@Mock
	private DiaryRepository diaryRepository;

	@Mock
	private Authentication authentication;

	@Mock
	private PrincipalDetails principalDetails;

	private User user;
	private Pet pet;
	private MemorialBook memorialBook;
	private SentimentAnalysis sentimentAnalysis;
	private Quest quest;
	private QuestAnswer questAnswer;
	private AiAnswer aiAnswer;
	private Diary diary;

	@BeforeEach
	public void setup() {
		user = User.signUpUser(new JoinRequestDto("email", "password", "name", "010-1111-1111",
			LocalDate.now(), Gender.MALE, LocalTime.now(), Role.ROLE_USER));
		pet = Pet.createPet(user, new CreatePetRequestDto("petName", 10,
			LocalDate.of(1990, 1, 1), "species", PetGender.MALE,
			"relationship", List.of("개구쟁이", "귀염둥이")), "profileImageUrl");
		memorialBook = MemorialBook.createMemorialBook(pet);
		sentimentAnalysis = SentimentAnalysis.createSentimentAnalysis(pet);
		quest = new Quest("quest content", QuestType.TEXT);
		questAnswer = QuestAnswer.createTextQuestAnswer(pet, quest,  new CreateAnswerRequestDto("answerContent", "TEXT"), "filteredContent");
		aiAnswer = AiAnswer.createAiAnswer(pet, quest, CreateAiAnswerRequestDto.createTextAiAnswerRequestDto("content", "TEXT"));
		diary = Diary.createDiaryHasImage(memorialBook, "filteredTitle", "filterdContent", "testUrl");

		ReflectionTestUtils.setField(user, "id", 1L);
		ReflectionTestUtils.setField(pet, "id", 1L);
	}

	@Test
	@DisplayName("메모리얼북_펫_ID로_조회_성공_테스트")
	public void 메모리얼북_펫_ID로_조회_성공_테스트() {
		// given
		BDDMockito.given(memorialBookRepository.findByPetIdAndIsDeleted(anyLong(), anyBoolean())).willReturn(Optional.of(memorialBook));

		// when
		MemorialBookInfoResponseDto responseDto = memorialBookService.getMemorialBookInfoByPetId(1L);

		// then
		Assertions.assertThat(responseDto.getId()).isEqualTo(memorialBook.getId());
	}

	@Test
	@DisplayName("메모리얼북_펫_ID로_조회_메모리얼북_존재하지_않는_에외_테스트")
	public void 메모리얼북_펫_ID로_조회_메모리얼북_존재하지_않는_에외_테스트() {
		// given
		BDDMockito.given(memorialBookRepository.findByPetIdAndIsDeleted(anyLong(), anyBoolean())).willReturn(Optional.empty());

		// when then
		Assertions.assertThatThrownBy(() -> memorialBookService.getMemorialBookInfoByPetId(1L))
			.isInstanceOf(ExceptionResponse.class)
			.hasFieldOrPropertyWithValue("customException", CustomException.NOT_FOUND_MEMORIAL_BOOK_EXCEPTION);
	}

	@Test
	@DisplayName("메모리얼북_상세_조회_성공_테스트")
	public void 메모리얼북_상세_조회_성공_테스트() {
		// given
		memorialBook.changeActiveStatus();
		BDDMockito.given(authentication.getPrincipal()).willReturn(principalDetails);
		BDDMockito.given(principalDetails.getUser()).willReturn(user);
		BDDMockito.given(memorialBookRepository.findByIdAndIsDeleted(anyLong(), anyBoolean())).willReturn(Optional.of(memorialBook));
		BDDMockito.given(petRepository.findByIdAndIsDeleted(anyLong(), anyBoolean())).willReturn(Optional.of(pet));
		BDDMockito.given(sentimentAnalysisRepository.findByPetId(anyLong())).willReturn(Optional.of(sentimentAnalysis));
		BDDMockito.given(questRepository.findAll()).willReturn(List.of(quest));
		BDDMockito.given(questAnswerRepository.findByPetIdAndIsDeleted(anyLong(), anyBoolean())).willReturn(List.of(questAnswer));
		BDDMockito.given(aiAnswerRepository.findByPetId(anyLong())).willReturn(List.of(aiAnswer));
		BDDMockito.given(diaryRepository.findByMemorialBookIdAndIsDeleted(anyLong(), anyBoolean())).willReturn(List.of(diary));

		// when
		MemorialBookDetailResponseDto responseDto = memorialBookService.getMemorialBookDetail(authentication, 1L, 1L);

		// then
		Assertions.assertThat(responseDto).isNotNull();
		Assertions.assertThat(responseDto.getMemorialBook()).isNotNull();
		Assertions.assertThat(responseDto.getPet()).isNotNull();
		Assertions.assertThat(responseDto.getSentimentAnalysis()).isNotNull();
		Assertions.assertThat(responseDto.getQuests()).hasSize(1);
		Assertions.assertThat(responseDto.getQuestAnswers()).hasSize(1);
		Assertions.assertThat(responseDto.getAiAnswers()).hasSize(1);
		Assertions.assertThat(responseDto.getDiaries()).hasSize(1);
	}

	@Test
	@DisplayName("메모리얼북_상세_조회_메모리얼북_존재하지_않는_예외_테스트")
	public void 메모리얼북_상세_조회_메모리얼북_존재하지_않는_예외_테스트() {
		// given
		BDDMockito.given(authentication.getPrincipal()).willReturn(principalDetails);
		BDDMockito.given(principalDetails.getUser()).willReturn(user);
		BDDMockito.given(memorialBookRepository.findByIdAndIsDeleted(anyLong(), anyBoolean())).willReturn(Optional.empty());

		// when then
		Assertions.assertThatThrownBy(() -> memorialBookService.getMemorialBookDetail(authentication, 1L, 1L))
			.isInstanceOf(ExceptionResponse.class)
			.hasFieldOrPropertyWithValue("customException", CustomException.NOT_FOUND_MEMORIAL_BOOK_EXCEPTION);
	}

	@Test
	@DisplayName("메모리얼북_상세_조회_펫_존재하지_않는_예외_테스트")
	public void 메모리얼북_상세_조회_펫_존재하지_않는_예외_테스트() {
		// given
		memorialBook.changeActiveStatus();
		BDDMockito.given(authentication.getPrincipal()).willReturn(principalDetails);
		BDDMockito.given(principalDetails.getUser()).willReturn(user);
		BDDMockito.given(memorialBookRepository.findByIdAndIsDeleted(anyLong(), anyBoolean())).willReturn(Optional.of(memorialBook));
		BDDMockito.given(petRepository.findByIdAndIsDeleted(anyLong(), anyBoolean())).willReturn(Optional.empty());

		// when then
		Assertions.assertThatThrownBy(() -> memorialBookService.getMemorialBookDetail(authentication, 1L, 1L))
			.isInstanceOf(ExceptionResponse.class)
			.hasFieldOrPropertyWithValue("customException", CustomException.NOT_FOUND_PET_EXCEPTION);
	}

	@Test
	@DisplayName("메모리얼북_상세_조회_감정_분석_존재하지_않는_예외_테스트")
	public void 메모리얼북_상세_조회_감정_분석_존재하지_않는_예외_테스트() {
		// given
		memorialBook.changeActiveStatus();
		BDDMockito.given(authentication.getPrincipal()).willReturn(principalDetails);
		BDDMockito.given(principalDetails.getUser()).willReturn(user);
		BDDMockito.given(memorialBookRepository.findByIdAndIsDeleted(anyLong(), anyBoolean())).willReturn(Optional.of(memorialBook));
		BDDMockito.given(petRepository.findByIdAndIsDeleted(anyLong(), anyBoolean())).willReturn(Optional.of(pet));
		BDDMockito.given(sentimentAnalysisRepository.findByPetId(anyLong())).willReturn(Optional.empty());

		// when then
		Assertions.assertThatThrownBy(() -> memorialBookService.getMemorialBookDetail(authentication, 1L, 1L))
			.isInstanceOf(ExceptionResponse.class)
			.hasFieldOrPropertyWithValue("customException", CustomException.NOT_FOUND_SENTIMENT_ANALYSIS_EXCEPTION);
	}

	@Test
	@DisplayName("메모리얼북_상세_조회_활성화되지_않은_예외_테스트")
	public void 메모리얼북_상세_조회_활성화되지_않은_예외_테스트() {
		// given
		BDDMockito.given(authentication.getPrincipal()).willReturn(principalDetails);
		BDDMockito.given(principalDetails.getUser()).willReturn(user);
		BDDMockito.given(memorialBookRepository.findByIdAndIsDeleted(anyLong(), anyBoolean())).willReturn(Optional.of(memorialBook));
		BDDMockito.given(petRepository.findByIdAndIsDeleted(anyLong(), anyBoolean())).willReturn(Optional.of(pet));
		BDDMockito.given(sentimentAnalysisRepository.findByPetId(anyLong())).willReturn(Optional.of(sentimentAnalysis));

		// when then
		Assertions.assertThatThrownBy(() -> memorialBookService.getMemorialBookDetail(authentication, 1L, 1L))
			.isInstanceOf(ExceptionResponse.class)
			.hasFieldOrPropertyWithValue("customException", CustomException.NOT_ACTIVATED_MEMORIAL_BOOK_EXCEPTION);
	}

	@Test
	@DisplayName("메모리얼북_상세_조회_공개되지_않은_예외_테스트")
	public void 메모리얼북_상세_조회_공개되지_않은_예외_테스트() {
		// given
		memorialBook.changeActiveStatus();
		User otherUser = User.signUpUser(new JoinRequestDto("otherEmail", "password", "name", "010-1111-1111",
			LocalDate.now(), Gender.MALE, LocalTime.now(), Role.ROLE_USER));
		BDDMockito.given(authentication.getPrincipal()).willReturn(principalDetails);
		BDDMockito.given(principalDetails.getUser()).willReturn(otherUser);
		BDDMockito.given(memorialBookRepository.findByIdAndIsDeleted(anyLong(), anyBoolean())).willReturn(Optional.of(memorialBook));
		BDDMockito.given(petRepository.findByIdAndIsDeleted(anyLong(), anyBoolean())).willReturn(Optional.of(pet));
		BDDMockito.given(sentimentAnalysisRepository.findByPetId(anyLong())).willReturn(Optional.of(sentimentAnalysis));

		// when then
		Assertions.assertThatThrownBy(() -> memorialBookService.getMemorialBookDetail(authentication, 1L, 1L))
			.isInstanceOf(ExceptionResponse.class)
			.hasFieldOrPropertyWithValue("customException", CustomException.NOT_OPEN_MEMORIAL_BOOK_EXCEPTION);
	}

}
