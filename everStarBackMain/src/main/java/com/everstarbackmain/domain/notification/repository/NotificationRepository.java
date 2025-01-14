package com.everstarbackmain.domain.notification.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.everstarbackmain.domain.notification.model.Notification;
import com.everstarbackmain.domain.user.model.User;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

	List<Notification> findByUser(User user);
	Boolean existsByUser(User user);
	Optional<Notification> findNotificationByUser(User user);
}
