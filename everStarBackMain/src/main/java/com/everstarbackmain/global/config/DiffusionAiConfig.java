package com.everstarbackmain.global.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import lombok.Getter;

@Configuration
@Getter
public class DiffusionAiConfig {

	@Value("${diffusionai.model}")
	private String model;

	@Value("${diffusionai.api.url}")
	private String apiUrl;

	@Value("${diffusionai.api.key}")
	private String apiKey;

	@Bean(name = "diffusionAiRestTemplate")
	public RestTemplate template() {
		RestTemplate restTemplate = new RestTemplate();
		restTemplate.getInterceptors().add(((request, body, execution) -> {
			request.getHeaders().add("Content-Type", "application/json");
			return execution.execute(request, body);
		}));
		return restTemplate;
	}
}
