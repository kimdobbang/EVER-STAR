package com.everstarbackmain.domain.memorialBook.util;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.Date;

import org.springframework.scheduling.TaskScheduler;
import org.springframework.stereotype.Component;

import com.everstarbackmain.domain.memorialBook.service.MemorialBookService;
import com.everstarbackmain.domain.user.model.User;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class MemorialBookScheduler {

	private final TaskScheduler taskScheduler;
	private final MemorialBookService memorialBookService;

	public void scheduleMemorialBookActivation(User user, Long petId) {
		LocalTime questReceptionTime = user.getQuestReceptionTime();
		LocalDateTime nextDayQuestReceptionTime = LocalDateTime.of(LocalDate.now().plusDays(1), questReceptionTime);
		Date nextDayQuestReceptionDate = Date.from(
			nextDayQuestReceptionTime.atZone(ZoneId.systemDefault()).toInstant());

		taskScheduler.schedule(() -> memorialBookService.changeActiveStatus(petId), nextDayQuestReceptionDate);
	}
}
