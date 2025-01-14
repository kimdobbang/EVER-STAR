package com.everstarbackmain.domain.petterLetter.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.everstarbackmain.domain.notification.util.NotificationUtil;
import com.everstarbackmain.domain.pet.repository.PetRepository;
import com.everstarbackmain.domain.petterLetter.responsedto.getLetterResponseDto.GetLetterResponseDto;
import com.everstarbackmain.global.openai.util.OpenAiClient;
import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.petterLetter.model.PetLetter;
import com.everstarbackmain.domain.petterLetter.repository.PetLetterRepository;
import com.everstarbackmain.domain.petterLetter.responsedto.PetLetterResponseDto;
import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.domain.userLetter.model.UserLetter;
import com.everstarbackmain.global.exception.CustomException;
import com.everstarbackmain.global.exception.ExceptionResponse;
import com.everstarbackmain.global.security.auth.PrincipalDetails;
import com.everstarbackmain.global.sms.SmsCertificationUtil;
import com.vane.badwordfiltering.BadWordFiltering;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j(topic = "elk")
public class PetLetterService {

	private final PetLetterRepository petLetterRepository;
	private final PetRepository petRepository;
	private final OpenAiClient openAiClient;
	private final SmsCertificationUtil smsCertificationUtil;
	private final NotificationUtil notificationUtil;

	@Transactional
	@Async
	public void writePetLetterAnswer(UserLetter userLetter) {
		String content = openAiClient.writePetLetterAnswer(userLetter);
		String filteredContent = filterBadWords(content);
		PetLetter petLetter = PetLetter.writePetLetterAnswer(userLetter, filteredContent);

		petLetterRepository.save(petLetter);

		sendSms(userLetter);
		sendNotification(userLetter);
	}

	public Page<PetLetterResponseDto> getPetLetters(Authentication authentication, Long petId, Pageable pageable) {
		User user = ((PrincipalDetails)authentication.getPrincipal()).getUser();
		if (!petRepository.existsByIdAndUserAndIsDeleted(petId, user, false)) {
			throw new ExceptionResponse(CustomException.NOT_FOUND_PET_EXCEPTION);
		}

		return petLetterRepository.findPetLettersByPetId(user, petId, pageable);
	}

	@Transactional
	public GetLetterResponseDto getLetter(Authentication authentication, Long petId, Long petLetterId) {
		User user = ((PrincipalDetails)authentication.getPrincipal()).getUser();

		Pet pet = petRepository.findByIdAndUserAndIsDeleted(petId, user, false)
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_PET_EXCEPTION));

		PetLetter petLetter = petLetterRepository.findPetLetterByIdAndPetAndIsDeleted(petLetterId, pet, false)
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_PETLETTER_EXCEPTION));

		petLetter.readPetLetter();

		GetLetterResponseDto getLetterResponseDto = GetLetterResponseDto.createGetLetterResponseDto(petLetter);
		return getLetterResponseDto;
	}

	private void sendSms(UserLetter userLetter) {
		Pet pet = userLetter.getPet();
		User user = pet.getUser();
		smsCertificationUtil.sendSms(user.getPhoneNumber(), pet.getName());
	}

	private void sendNotification(UserLetter userLetter) {
		Pet pet = userLetter.getPet();
		User user = pet.getUser();
		notificationUtil.sendPetLetterNotification(user);
	}

	private String filterBadWords(String content) {
		BadWordFiltering badWordFiltering = new BadWordFiltering();
		return badWordFiltering.change(content, new String[] {"_", "-", "1", " ", ".", "@"});
	}
}
