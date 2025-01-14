package com.everstarbackmain.global.openai.util;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.everstarbackmain.domain.quest.model.Quest;
import com.everstarbackmain.domain.questAnswer.model.QuestAnswer;
import com.everstarbackmain.global.openai.model.ChatGPTRequest;
import com.everstarbackmain.global.openai.model.ChatGPTResponse;
import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.sentimentAnalysis.model.SentimentAnalysis;
import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.domain.userLetter.model.UserLetter;
import com.everstarbackmain.global.config.OpenAiConfig;
import com.everstarbackmain.global.exception.CustomException;
import com.everstarbackmain.global.exception.ExceptionResponse;
import com.everstarbackmain.global.openai.model.Content;
import com.everstarbackmain.global.openai.model.ImageGPTRequest;
import com.everstarbackmain.global.openai.model.ImageGPTResponse;
import com.everstarbackmain.global.openai.model.OpenAiPrompt;
import com.everstarbackmain.global.openai.model.TextImageGPTRequest;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j(topic = "elk")
public class OpenAiClient {

	private final RestTemplate restTemplate;
	private final OpenAiConfig openAiConfig;

	public OpenAiClient(@Qualifier("openAiRestTemplate") RestTemplate restTemplate, OpenAiConfig openAiConfig) {
		this.restTemplate = restTemplate;
		this.openAiConfig = openAiConfig;
	}

	public String analysisTotalSentiment(SentimentAnalysis sentimentAnalysis) {
		String userInput = OpenAiPrompt.ANALYSIS_TOTAL_SENTIMENT_PROMPT.getPrompt() +
				parseAnalysisToJsonString(sentimentAnalysis);

		ChatGPTRequest request = ChatGPTRequest.createChatGPTRequest(openAiConfig.getModel(),
			OpenAiPrompt.ANALYSIS_TOTAL_SENTIMENT_SYSTEM_PROMPT.getPrompt(), userInput);
		ChatGPTResponse response = restTemplate.postForObject(openAiConfig.getApiUrl(), request, ChatGPTResponse.class);

		if (response == null || response.getChoices() == null || response.getChoices().isEmpty()) {
			throw new ExceptionResponse(CustomException.OPENAI_API_EXCEPTION);
		}

		String result = response.getChoices().get(0).getMessage().getContent();
		log.info("main server - openai api total sentiment analysis response : {}", result);

		return result;
	}

	public String writePetLetterAnswer(UserLetter userLetter) {
		String prompt = createPetLetterAnswerPrompt(userLetter);

		ChatGPTRequest request = ChatGPTRequest.createChatGPTRequest(openAiConfig.getModel(),
			String.format(OpenAiPrompt.PET_LETTER_SYSTEM_PROMPT.getPrompt(), userLetter.getPet().getSpecies()), prompt);
		ChatGPTResponse response = restTemplate.postForObject(openAiConfig.getApiUrl(), request, ChatGPTResponse.class);

		if (response == null || response.getChoices() == null || response.getChoices().isEmpty()) {
			throw new ExceptionResponse(CustomException.OPENAI_API_EXCEPTION);
		}

		String result = response.getChoices().get(0).getMessage().getContent();
		log.info("main server - openai api write pet letter answer response : {}", result);

		return result;
	}

	public String writePetLetter(List<UserLetter> userLetters, Pet pet) {
		String contents = combineLetters(userLetters);
		String prompt = createPetLetterPrompt(contents, pet);

		ChatGPTRequest request = ChatGPTRequest.createChatGPTRequest(openAiConfig.getModel(),
			String.format(OpenAiPrompt.PET_LETTER_SYSTEM_PROMPT.getPrompt(), pet.getSpecies()), prompt);
		ChatGPTResponse response = restTemplate.postForObject(openAiConfig.getApiUrl(), request, ChatGPTResponse.class);

		if (response == null || response.getChoices() == null || response.getChoices().isEmpty()) {
			throw new ExceptionResponse(CustomException.OPENAI_API_EXCEPTION);
		}

		String result = response.getChoices().get(0).getMessage().getContent();
		log.info("main server - openai api write pet letter response : {}", result);

		return result;
	}

	private String parseAnalysisToJsonString(SentimentAnalysis sentimentAnalysis) {
		return "{"
			+ "\"1주차 감정분석 결과\": " + sentimentAnalysis.getWeek1Result() + ","
			+ "\"2주차 감정분석 결과\": " + sentimentAnalysis.getWeek2Result() + ","
			+ "\"3주차 감정분석 결과\": " + sentimentAnalysis.getWeek3Result() + ","
			+ "\"4주차 감정분석 결과\": " + sentimentAnalysis.getWeek4Result() + ","
			+ "\"5주차 감정분석 결과\": " + sentimentAnalysis.getWeek5Result() + ","
			+ "\"6주차 감정분석 결과\": " + sentimentAnalysis.getWeek6Result() + ","
			+ "\"7주차 감정분석 결과\": " + sentimentAnalysis.getWeek7Result()
			+ "}";
	}

	private String combineLetters(List<UserLetter> userLetters) {
		return userLetters.stream()
			.map(UserLetter::getContent)
			.collect(Collectors.joining());
	}

	private String createPetLetterAnswerPrompt(UserLetter userLetter) {
		Pet pet = userLetter.getPet();
		String petName = pet.getName();

		User user = pet.getUser();
		String userName = user.getUserName();

		String letterContent = userLetter.getContent();

		String prompt = String.format(OpenAiPrompt.WRITE_PET_LETTER_ANSWER_PROMPT.getPrompt(), petName, petName, letterContent, petName,
			userName);
		return prompt;
	}

	private String createPetLetterPrompt(String content, Pet pet) {
		String petName = pet.getName();
		User user = pet.getUser();
		String userName = user.getUserName();

		String prompt = String.format(OpenAiPrompt.WRITE_PET_LETTER_ANSWER_PROMPT.getPrompt(), petName, petName, content, petName, userName);
		return prompt;
	}

	public String writePetTextToTextAnswer(User user, Pet pet, List<String> petPersonalities, Quest quest, QuestAnswer questAnswer) {
		String prompt = createPetTextToTextAnswerPrompt(user, pet, petPersonalities, quest, questAnswer);

		ChatGPTRequest request = new ChatGPTRequest(openAiConfig.getModel(), prompt);
		ChatGPTResponse response = restTemplate.postForObject(openAiConfig.getApiUrl(), request, ChatGPTResponse.class);

		if (response == null || response.getChoices() == null || response.getChoices().isEmpty()) {
			throw new ExceptionResponse(CustomException.OPENAI_API_EXCEPTION);
		}

		String result = response.getChoices().get(0).getMessage().getContent();
		log.info("main server - openai api pet text answer response : {}", result);

		return result;
	}

	private String createPetTextToTextAnswerPrompt(User user, Pet pet, List<String> petPersonalities, Quest quest, QuestAnswer questAnswer) {
		String petName = pet.getName();
		String personalities = String.join(", ", petPersonalities);
		String prompt = String.format(OpenAiPrompt.WRITE_PET_TEXT_TO_TEXT_ANSWER_PROMPT.getPrompt(), petName, petName,
				quest.getContent().replace("(이름)", petName), questAnswer.getContent(), petName, pet.getRelationship(), personalities, user.getUserName(), user.getGender().getGender());
		return prompt;
	}

	public String writePetTextImageToTextAnswer(User user, Pet pet, List<String> petPersonalities, Quest quest,
		QuestAnswer questAnswer, String imageUrl) {
		String prompt = createPetTextImageToTextAnswerPrompt(user, pet, petPersonalities, quest, questAnswer);

		List<Content> contents = new ArrayList<>();
		contents.add(Content.createTextContent(prompt));
		contents.add(Content.createImageContent(imageUrl));

		TextImageGPTRequest request = new TextImageGPTRequest(openAiConfig.getModel(), contents);
		ChatGPTResponse response = restTemplate.postForObject(openAiConfig.getApiUrl(), request, ChatGPTResponse.class);

		if (response == null || response.getChoices() == null || response.getChoices().isEmpty()) {
			throw new ExceptionResponse(CustomException.OPENAI_API_EXCEPTION);
		}

		String result = response.getChoices().get(0).getMessage().getContent();
		log.info("main server - openai api pet text image answer response : {}", result);

		return result;
	}

	private String createPetTextImageToTextAnswerPrompt(User user, Pet pet, List<String> petPersonalities, Quest quest, QuestAnswer questAnswer) {
		String petName = pet.getName();
		String personalities = String.join(", ", petPersonalities);
		String prompt = String.format(OpenAiPrompt.WRITE_PET_TEXT_IMAGE_TO_TEXT_ANSWER_PROMPT.getPrompt(), petName, petName,
				quest.getContent().replace("(이름)", petName), questAnswer.getContent(), petName, pet.getRelationship(), personalities, user.getUserName(), user.getGender().getGender());
		return prompt;
	}

	public String writePetTextToImageAnswer(Pet pet, Quest quest, QuestAnswer questAnswer) {
		String prompt = createPetTextToImageAnswerPrompt(pet, quest, questAnswer);

		ImageGPTRequest request = new ImageGPTRequest(prompt);
		ImageGPTResponse response = restTemplate.postForObject(openAiConfig.getCreateImageUrl(), request, ImageGPTResponse.class);

		if (response == null || response.getData() == null || response.getData().isEmpty()) {
			throw new ExceptionResponse(CustomException.OPENAI_API_EXCEPTION);
		}

		return response.getData().get(0).getB64_json();
	}

	private String createPetTextToImageAnswerPrompt(Pet pet, Quest quest, QuestAnswer questAnswer) {
		String prompt = String.format(OpenAiPrompt.WRITE_PET_TEXT_TO_IMAGE_ANSWER_PROMPT.getPrompt(),
			questAnswer.getContent(), pet.getSpecies());
		return prompt;
	}

	public String writePetTextImageToImageAnswer(Quest quest, QuestAnswer questAnswer, String imageUrl) {
		String prompt = createPetTextImageToImageAnswerPrompt(quest, questAnswer, imageUrl);

		ImageGPTRequest request = new ImageGPTRequest(prompt);
		ImageGPTResponse response = restTemplate.postForObject(openAiConfig.getCreateImageUrl(), request, ImageGPTResponse.class);

		if (response == null || response.getData() == null || response.getData().isEmpty()) {
			throw new ExceptionResponse(CustomException.OPENAI_API_EXCEPTION);
		}

		return response.getData().get(0).getB64_json();
	}

	private String createPetTextImageToImageAnswerPrompt(Quest quest, QuestAnswer questAnswer, String imageUrl) {
		String prompt = createDalleImagePrompt(questAnswer);

		List<Content> contents = new ArrayList<>();
		contents.add(Content.createTextContent(prompt));
		contents.add(Content.createImageContent(imageUrl));

		TextImageGPTRequest request = new TextImageGPTRequest(openAiConfig.getModel(), contents);
		String extractedString = "";

		while (true) {
			ChatGPTResponse response = restTemplate.postForObject(openAiConfig.getApiUrl(), request, ChatGPTResponse.class);

			if (response == null || response.getChoices() == null || response.getChoices().isEmpty()) {
				throw new ExceptionResponse(CustomException.OPENAI_API_EXCEPTION);
			}

			String result = response.getChoices().get(0).getMessage().getContent();
			log.info("main server - Dalle 이미지 생성용 프롬프트: {}", result);
			Pattern pattern = Pattern.compile("\"([^\"]*)\"");
			Matcher matcher = pattern.matcher(result);

			if (matcher.find()) {
				extractedString = matcher.group(1);
				if (extractedString.isEmpty()) {
					continue;
				}

				if (quest.getId().equals(40L)) {
					extractedString += " When drawing a caricature, draw the person as the same Korean as in the photo.";
				}
				log.info("main server - 추출된 Dalle 이미지 생성용 프롬프트: {}", extractedString);
				break;
			}

		}

		return extractedString;
	}

	private String createDalleImagePrompt(QuestAnswer questAnswer) {
		return String.format(OpenAiPrompt.MAKE_DALLE_IMAGE_PROMPT.getPrompt(), questAnswer.getContent());
	}
}

