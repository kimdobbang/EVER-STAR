package com.everstarbackauth.domain.sms.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.everstarbackauth.domain.sms.repository.SmsCertificationRepository;
import com.everstarbackauth.domain.sms.requestDto.CheckCodeRequestDto;
import com.everstarbackauth.domain.sms.requestDto.SendCodeRequestDto;
import com.everstarbackauth.domain.user.repository.UserRepository;
import com.everstarbackauth.global.exception.CustomException;
import com.everstarbackauth.global.exception.ExceptionResponse;
import com.everstarbackauth.global.util.SmsCertificationUtil;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class SmsService {
	private final SmsCertificationUtil smsUtil;
	private final SmsCertificationRepository smsCertificationRepository;
	private final UserRepository userRepository;

	@Transactional
	public void sendSms(@Valid SendCodeRequestDto sendCodeRequestDto) {
		String to = validatePhoneNumber(sendCodeRequestDto.getPhone());
		String certificationNumber = generateCertificationNumber();

		smsUtil.sendSms(to, certificationNumber);
		smsCertificationRepository.saveSmsCertification(to, certificationNumber);

		log.info("SMS sent successfully to {}", to);
		log.info("SMS sent successfully certificationNumber {}", certificationNumber);
	}

	// 인증처리 로직
	@Transactional
	public void verifySms(CheckCodeRequestDto checkCodeRequestDto) {
		String phone = validatePhoneNumber(checkCodeRequestDto.getPhone());

		if (!isVerify(checkCodeRequestDto)) {
			throw new ExceptionResponse(CustomException.NOT_MATCH_AUTH_CODE_EXCEPTION);
		}

		smsCertificationRepository.saveSuccessNumber(phone);
		smsCertificationRepository.deleteSmsCertification(phone);

		log.info("SMS verification successful for {}", phone);
	}

	// 인증 유효성 검증
	public boolean isVerify(CheckCodeRequestDto checkCodeRequestDto) {
		String storedCertificationNumber = smsCertificationRepository.getSmsCertification(checkCodeRequestDto.getPhone());

		boolean verificationResult = smsCertificationRepository.hasKey(checkCodeRequestDto.getPhone()) &&
			storedCertificationNumber.equals(checkCodeRequestDto.getCertificationNumber());

		return verificationResult;
	}

	private String validatePhoneNumber(String phone) {
		if (userRepository.existsUserByPhoneNumber(phone)) {
			throw new ExceptionResponse(CustomException.DUPLICATED_PHONENUMBER_EXCEPTION);
		}
		return phone;
	}

	private String generateCertificationNumber() {
		int randomNumber = (int)(Math.random() * 90000) + 10000;
		return String.valueOf(randomNumber);
	}
}
