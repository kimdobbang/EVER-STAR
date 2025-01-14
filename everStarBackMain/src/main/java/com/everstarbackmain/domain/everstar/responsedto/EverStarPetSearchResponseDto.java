package com.everstarbackmain.domain.everstar.responsedto;

import com.querydsl.core.annotations.QueryProjection;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class EverStarPetSearchResponseDto {

	private Long id;
	private String petName;
	private String userName;
	private String email;

	@QueryProjection
	public EverStarPetSearchResponseDto(Long id, String petName, String userName, String email) {
		this.id = id;
		this.petName = petName;
		this.userName = maskUserName(userName);
		this.email = maskEmail(email);
	}

	private String maskUserName(String userName) {
		if (userName == null || userName.length() == 0) {
			return userName;
		} else if (userName.length() == 1) {
			return userName;
		} else if (userName.length() == 2) {
			return userName.charAt(0) + "*";
		} else {
			StringBuilder maskedName = new StringBuilder(userName);
			int length = userName.length();
			for (int i = 1; i < length - 1; i++) {
				maskedName.setCharAt(i, '*');
			}
			return maskedName.toString();
		}
	}

	private String maskEmail(String email) {
		String[] parts = email.split("@");
		String localPart = parts[0];
		String domainPart = parts[1];
		if (localPart.length() < 2) {
			return email; // Not enough characters to mask
		}
		StringBuilder maskedLocalPart = new StringBuilder(localPart);
		maskedLocalPart.replace(1, localPart.length(), "*".repeat(localPart.length() - 1));
		return maskedLocalPart.toString() + "@" + domainPart;
	}
}
