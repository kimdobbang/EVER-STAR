package com.everstarbackauth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class EverStarBackAuthApplication {

	public static void main(String[] args) {
		SpringApplication.run(EverStarBackAuthApplication.class, args);
	}

}
