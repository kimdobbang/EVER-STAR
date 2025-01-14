package com.everstarbackmain.global.openai.model;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class Choice {

	private int index;
	private Message message;

}
