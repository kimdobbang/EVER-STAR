package com.b101.everStarBackChat.domain.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.b101.everStarBackChat.domain.user.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {

	Optional<User> findUserByEmail(String email);

	Optional<User> findUserByEmailAndIsDeleted(String email, boolean isDeleted);
}
