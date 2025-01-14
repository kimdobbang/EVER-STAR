package com.everstarbackmain.global.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.theokanning.openai.service.OpenAiService;

@Configuration
public class GptConfig {

	@Value("${openai.api.key}")
	private String gptKey;

	@Bean
	public OpenAiService openAiService(){
		OpenAiService service = new OpenAiService(gptKey);
		return service;
	}
}
