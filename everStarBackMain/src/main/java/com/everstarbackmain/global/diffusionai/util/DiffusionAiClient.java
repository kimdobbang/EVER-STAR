package com.everstarbackmain.global.diffusionai.util;

import java.net.URLDecoder;
import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.everstarbackmain.domain.questAnswer.model.QuestAnswer;
import com.everstarbackmain.global.config.DiffusionAiConfig;
import com.everstarbackmain.global.config.GptConfig;
import com.everstarbackmain.global.diffusionai.model.DiffusionAiRequest;
import com.everstarbackmain.global.diffusionai.model.DiffusionAiResponse;
import com.everstarbackmain.global.exception.CustomException;
import com.everstarbackmain.global.exception.ExceptionResponse;
import com.theokanning.openai.completion.chat.ChatCompletionChoice;
import com.theokanning.openai.completion.chat.ChatCompletionRequest;
import com.theokanning.openai.completion.chat.ChatCompletionResult;
import com.theokanning.openai.completion.chat.ChatMessage;
import com.theokanning.openai.completion.chat.ChatMessageRole;
import com.theokanning.openai.service.OpenAiService;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j(topic = "elk")
public class DiffusionAiClient {

	private final RestTemplate restTemplate;
	private final DiffusionAiConfig diffusionAiConfig;
	private final GptConfig gptConfig;

	public DiffusionAiClient(@Qualifier("diffusionAiRestTemplate") RestTemplate restTemplate,
		DiffusionAiConfig diffusionAiConfig, GptConfig gptConfig) {
		this.restTemplate = restTemplate;
		this.diffusionAiConfig = diffusionAiConfig;
		this.gptConfig = gptConfig;
	}

	public String writePetTextImageToImageAnswer(QuestAnswer questAnswer, String imageUrl) {
		String prompt = translateKorToEng(questAnswer.getContent());

		DiffusionAiRequest request = new DiffusionAiRequest(diffusionAiConfig.getApiKey(), diffusionAiConfig.getModel(),
			prompt, imageUrl);
		DiffusionAiResponse response = restTemplate.postForObject(diffusionAiConfig.getApiUrl(), request, DiffusionAiResponse.class);
		log.info(response.getStatus());
		log.info(response.getMessage());
		if (response == null || response.getOutput() == null || response.getOutput().isEmpty()) {
			throw new ExceptionResponse(CustomException.OPENAI_API_EXCEPTION);
		}

		return response.getOutput().get(0);
	}

	private String translateKorToEng(String prompt){
		OpenAiService openAiService = gptConfig.openAiService();
		String decodePrompt = URLDecoder.decode(prompt);

		String message = """
                Translate the following Korean text to English: '{%s}'
                """.formatted(decodePrompt);

		ChatMessage chatMessage = new ChatMessage(ChatMessageRole.USER.value(),message);
		ChatCompletionRequest chatCompletionRequest = ChatCompletionRequest.builder()
			.messages(List.of(chatMessage))
			.model("gpt-4o-mini")
			.build();

		ChatCompletionResult response = openAiService.createChatCompletion(chatCompletionRequest);
		ChatCompletionChoice choice = response.getChoices().get(0);
		String translatePrompt = choice.getMessage().getContent();

		return translatePrompt;
	}
}
