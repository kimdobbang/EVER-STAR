package com.everstarbackmain.domain.petterLetter.util;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.stereotype.Component;

import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.petterLetter.evnet.sendPetLetterEvent.SendPetLetterEvent;
import com.everstarbackmain.domain.petterLetter.service.PetLetterService;
import com.everstarbackmain.domain.userLetter.model.UserLetter;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class PetLetterScheduler {

	private final TaskScheduler taskScheduler;
	private final PetLetterService petLetterService;
	private final ApplicationEventPublisher eventPublisher;

	public void schedulePetLetter(UserLetter userLetter) {
		LocalDateTime nextDayWritePetLetterTime = userLetter.getCreatedTime().plusSeconds(1);
		Date nextDayWritePetLetterDate = Date.from(
			nextDayWritePetLetterTime.atZone(ZoneId.systemDefault()).toInstant());

		taskScheduler.schedule(() -> petLetterService.writePetLetterAnswer(userLetter), nextDayWritePetLetterDate);
	}

	public void scheduleSendPetLetter(Pet pet) {
		LocalDateTime sendLetterTime = pet.getSendLetterTime();
		Date sendPetLetterDate = Date.from(
			sendLetterTime.atZone(ZoneId.systemDefault()).toInstant());
		taskScheduler.schedule(() -> eventPublisher.publishEvent(new SendPetLetterEvent(pet)), sendPetLetterDate);
	}
}
