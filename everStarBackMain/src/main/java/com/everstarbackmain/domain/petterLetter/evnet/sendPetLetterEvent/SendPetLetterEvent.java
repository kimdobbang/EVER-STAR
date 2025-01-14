package com.everstarbackmain.domain.petterLetter.evnet.sendPetLetterEvent;

import com.everstarbackmain.domain.pet.model.Pet;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class SendPetLetterEvent {

	private Pet pet;
}
