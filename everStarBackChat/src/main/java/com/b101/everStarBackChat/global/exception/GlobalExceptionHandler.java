package com.b101.everStarBackChat.global.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lombok.extern.slf4j.Slf4j;

@RestControllerAdvice
@Slf4j(topic = "elk")
public class GlobalExceptionHandler {

	@ExceptionHandler(ExceptionResponse.class)
	public ResponseEntity<?> handlerException(ExceptionResponse e) {
		Map<String, String> errorDetails = new HashMap<>();
		errorDetails.put("errorCode", e.getCustomException().getErrorCode());
		errorDetails.put("errorMessage", e.getCustomException().getErrorMessage());
		log.error("chat server - error : {}", e);
		return ResponseEntity.status(HttpStatus.valueOf(e.getCustomException().getStatusNum())).body(errorDetails);
	}
}
