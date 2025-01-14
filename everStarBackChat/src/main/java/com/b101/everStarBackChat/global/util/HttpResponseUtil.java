package com.b101.everStarBackChat.global.util;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
public class HttpResponseUtil {

	public ResponseEntity<Map<String, Object>> createResponse(Object o) {
		Map<String, Object> data = new HashMap<>();
		data.put("data", o);
		return ResponseEntity.ok().body(data);
	}
}
