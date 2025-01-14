package com.everstarbackmain.domain.petLetter.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Collections;
import java.util.List;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.BDDMockito;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.everstarbackmain.domain.notification.util.NotificationUtil;
import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.pet.model.PetGender;
import com.everstarbackmain.domain.pet.repository.PetRepository;
import com.everstarbackmain.domain.pet.requestdto.CreatePetRequestDto;
import com.everstarbackmain.domain.petterLetter.evnet.sendPetLetterEvent.SendPetLetterEvent;
import com.everstarbackmain.domain.petterLetter.evnet.sendPetLetterEvent.SendPetLetterEventListener;
import com.everstarbackmain.domain.petterLetter.model.PetLetter;
import com.everstarbackmain.domain.petterLetter.repository.PetLetterRepository;
import com.everstarbackmain.domain.petterLetter.util.PetLetterScheduler;
import com.everstarbackmain.domain.user.model.Gender;
import com.everstarbackmain.domain.user.model.Role;
import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.domain.user.requestDto.JoinRequestDto;
import com.everstarbackmain.domain.userLetter.model.UserLetter;
import com.everstarbackmain.domain.userLetter.repository.UserLetterRepository;
import com.everstarbackmain.domain.userLetter.requestDto.WriteLetterRequestDto;
import com.everstarbackmain.global.openai.util.OpenAiClient;
import com.everstarbackmain.global.sms.SmsCertificationUtil;

@ExtendWith(MockitoExtension.class)
public class WritePetLetterEventListenerTest {

	@InjectMocks
	private SendPetLetterEventListener sendPetLetterEventListener;

	@Mock
	private OpenAiClient openAiClient;

	@Mock
	private UserLetterRepository userLetterRepository;

	@Mock
	private PetLetterRepository petLetterRepository;

	@Mock
	private PetRepository petRepository;

	@Mock
	private SmsCertificationUtil smsCertificationUtil;

	@Mock
	private NotificationUtil notificationUtil;

	@Mock
	private PetLetterScheduler petLetterScheduler;

	private User user;
	private Pet pet;
	private WriteLetterRequestDto requestDto;
	private UserLetter userLetter;
	private PetLetter petLetter;
	private List<UserLetter> userLetters;
	private SendPetLetterEvent event;

	@BeforeEach
	public void setUp() {
		user = User.signUpUser(new JoinRequestDto("email", "password", "name", "010-1111-1111",
			LocalDate.now(), Gender.MALE, LocalTime.now(), Role.ROLE_USER));

		pet = Pet.createPet(user, new CreatePetRequestDto("petName", 10,
			LocalDate.of(1990, 1, 1), "species", PetGender.MALE,
			"relationship", List.of("개구쟁이", "귀염둥이")), "profileImageUrl");
		requestDto = new WriteLetterRequestDto("dd");
		userLetter = UserLetter.writeLetterHasImage(pet, "filteredContent", "image");
		userLetter = UserLetter.writeLetterHasNotImage(pet, "filteredContent");
		userLetters = Collections.singletonList(userLetter);
		petLetter = PetLetter.writePetLetterAnswer(userLetter, "content");
	}

	@Test
	public void 펫_편지_생성_테스트() {
		// Given
		BDDMockito.given(userLetterRepository.getUserLettersWithTimeRange(pet)).willReturn(userLetters);
		BDDMockito.given(openAiClient.writePetLetter(userLetters, pet)).willReturn("content");

		// When
		SendPetLetterEvent event = new SendPetLetterEvent(pet);
		sendPetLetterEventListener.writePetLetter(event);

		// Then
		BDDMockito.then(smsCertificationUtil).should().sendSms(user.getPhoneNumber(), pet.getName());
		BDDMockito.then(petRepository).should().save(pet);
		BDDMockito.then(petLetterScheduler).should().scheduleSendPetLetter(pet);

		Assertions.assertThat(petLetter.getContent()).isEqualTo("content");
	}
}
