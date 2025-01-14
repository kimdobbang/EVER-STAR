package com.everstarbackmain.domain.sentimentAnalysis.util;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import com.everstarbackmain.domain.sentimentAnalysis.model.SentimentAnalysisResult;
import com.everstarbackmain.global.exception.CustomException;
import com.everstarbackmain.global.exception.ExceptionResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Component
@Slf4j
public class NaverCloudClient {

	private final ObjectMapper objectMapper;
	private final WebClient webClient;

	@Value("${naver.cloud.id}")
	private String clientId;

	@Value("${naver.cloud.secret}")
	private String clientSecret;

	public NaverCloudClient(ObjectMapper objectMapper) {
		this.objectMapper = objectMapper;
		this.webClient = WebClient.builder()
			.baseUrl("https://naveropenapi.apigw.ntruss.com")
			.build();
	}

	public SentimentAnalysisResult analyseSentiment(String content) {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("content", content);

		Mono<SentimentAnalysisResult> responseMono = webClient.post()
			.uri(uriBuilder -> uriBuilder.path("/sentiment-analysis/v1/analyze")
				.build())
			.header("X-NCP-APIGW-API-KEY-ID", clientId)
			.header("X-NCP-APIGW-API-KEY", clientSecret)
			.contentType(MediaType.APPLICATION_JSON)
			.bodyValue(jsonObject.toString())
			.retrieve()
			.bodyToMono(String.class)
			.map(this::getConfidenceFromResponse);

		return responseMono.blockOptional()
			.orElseThrow(() -> new ExceptionResponse(CustomException.NAVER_SENTIMENT_API_EXCEPTION));
	}

	private SentimentAnalysisResult getConfidenceFromResponse(String response) {
		try {
			JsonNode root = objectMapper.readTree(response);
			JsonNode confidenceNode = root.path("document").path("confidence");

			return SentimentAnalysisResult.createSentimentAnalysisResult(confidenceNode.path("neutral").asDouble(),
				confidenceNode.path("positive").asDouble(),
				confidenceNode.path("negative").asDouble());
		} catch (JsonProcessingException e) {
			throw new ExceptionResponse(CustomException.NAVER_SENTIMENT_API_EXCEPTION);
		}
	}
}
