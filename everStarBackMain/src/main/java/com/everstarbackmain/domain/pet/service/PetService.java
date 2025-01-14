package com.everstarbackmain.domain.pet.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.everstarbackmain.domain.memorialBook.model.MemorialBook;
import com.everstarbackmain.domain.memorialBook.repository.MemorialBookRepository;
import com.everstarbackmain.domain.pet.model.Pet;
import com.everstarbackmain.domain.pet.model.PetPersonality;
import com.everstarbackmain.domain.pet.repository.PetPersonalityRepository;
import com.everstarbackmain.domain.pet.repository.PetRepository;
import com.everstarbackmain.domain.pet.requestdto.CreatePetRequestDto;
import com.everstarbackmain.domain.pet.requestdto.UpdatePetIntroductionDto;
import com.everstarbackmain.domain.pet.responsedto.EnrolledPetsResponseDto;
import com.everstarbackmain.domain.pet.responsedto.MyPagePetInfoResponseDto;
import com.everstarbackmain.domain.petterLetter.util.PetLetterScheduler;
import com.everstarbackmain.domain.sentimentAnalysis.model.SentimentAnalysis;
import com.everstarbackmain.domain.sentimentAnalysis.repository.SentimentAnalysisRepository;
import com.everstarbackmain.domain.user.model.User;
import com.everstarbackmain.global.exception.CustomException;
import com.everstarbackmain.global.exception.ExceptionResponse;
import com.everstarbackmain.global.util.S3UploadUtil;
import com.vane.badwordfiltering.BadWordFiltering;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j(topic = "elk")
public class PetService {

	private final PetRepository petRepository;
	private final PetPersonalityRepository petPersonalityRepository;
	private final MemorialBookRepository memorialBookRepository;
	private final SentimentAnalysisRepository sentimentAnalysisRepository;
	private final PetLetterScheduler petLetterScheduler;
	private final S3UploadUtil s3UploadUtil;

	@Transactional
	public void createPet(User user, CreatePetRequestDto createPetRequestDto, MultipartFile profileImage) {
		String profileImageUrl = s3UploadUtil.saveFile(profileImage);
		Pet pet = Pet.createPet(user, createPetRequestDto, profileImageUrl);
		petRepository.save(pet);

		addPersonalities(pet, createPetRequestDto);
		createMemorialBook(pet);
		createSentimentAnalysis(pet);

		// Scheduler
		petLetterScheduler.scheduleSendPetLetter(pet);
	}

	private void addPersonalities(Pet pet, CreatePetRequestDto createPetRequestDto) {
		for (String personalityValue : createPetRequestDto.getPersonalities()) {
			PetPersonality petPersonality = PetPersonality.createPersonality(pet, personalityValue);
			petPersonalityRepository.save(petPersonality);
		}
	}

	@Transactional
	public void updatePetIntroduction(User user, Long petId, UpdatePetIntroductionDto requestDto) {
		String filteredNewIntroduction = filterBadWords(requestDto.getIntroduction());
		Pet pet = getPetByIdAndUser(petId, user);

		pet.updatePetIntroduction(
			filteredNewIntroduction != null && !filteredNewIntroduction.isEmpty()
				? filteredNewIntroduction
				: pet.getName() + " 의 사랑스런 소개글을 작성 해주세요♥"
		);
	}

	private void createMemorialBook(Pet pet) {
		MemorialBook memorialBook = MemorialBook.createMemorialBook(pet);
		memorialBookRepository.save(memorialBook);
	}

	private void createSentimentAnalysis(Pet pet) {
		SentimentAnalysis sentimentAnalysis = SentimentAnalysis.createSentimentAnalysis(pet);
		sentimentAnalysisRepository.save(sentimentAnalysis);
	}

	public List<EnrolledPetsResponseDto> getAllUserPets(User user) {
		Long userId = user.getId();
		List<Pet> pets = petRepository.findAllByUserIdAndIsDeleted(userId, false);
		return pets.stream()
			.map(EnrolledPetsResponseDto::createEnrolledResponseDto)
			.collect(Collectors.toList());
	}

	public MyPagePetInfoResponseDto getMyPetInfo(User user, Long petId) {
		Pet pet = getPetByIdAndUser(petId, user);
		List<String> petPersonalities = petPersonalityRepository.findPersonalityValuesByPetIdAndIsDeleted(petId, false);
		return MyPagePetInfoResponseDto.createMyPagePetInfoDto(pet, petPersonalities);
	}

	@Transactional
	public void updatePetProfileImage(User user, Long petId, MultipartFile profileImage) {
		String profileImageUrl = s3UploadUtil.saveFile(profileImage);
		Pet pet = getPetByIdAndUser(petId, user);
		pet.updateProfileImage(profileImageUrl);
	}

	private String filterBadWords(String content) {
		BadWordFiltering badWordFiltering = new BadWordFiltering();
		return badWordFiltering.change(content, new String[] {"_", "-", "1", " ", ".", "@"});
	}

	private Pet getPetByIdAndUser(Long petId, User user) {
		return petRepository.findByIdAndUserAndIsDeleted(petId, user, false)
			.orElseThrow(() -> new ExceptionResponse(CustomException.NOT_FOUND_PET_EXCEPTION));
	}

}
