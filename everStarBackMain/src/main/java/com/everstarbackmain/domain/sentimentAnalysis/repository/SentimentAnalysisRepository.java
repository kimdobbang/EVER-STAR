package com.everstarbackmain.domain.sentimentAnalysis.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.everstarbackmain.domain.sentimentAnalysis.model.SentimentAnalysis;

public interface SentimentAnalysisRepository extends JpaRepository<SentimentAnalysis, Long> {

	Optional<SentimentAnalysis> findByPetId(Long petId);
}
