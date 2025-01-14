package com.everstarbackmain.domain.aiAnswer.event;

import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.quest.model.Quest;
import com.everstarbackmain.domain.questAnswer.model.QuestAnswer;
import com.everstarbackmain.domain.user.model.User;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class RequestTextImageToImageAiAnswerEvent {

	private User user;
	private Pet pet;
	private Quest quest;
	private QuestAnswer questAnswer;
	private String imageUrl;
}
