package com.gamified.learning.repository;

import com.gamified.learning.model.UserMission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserMissionRepository extends JpaRepository<UserMission, Long> {

    List<UserMission> findByUserIdAndCourse(Long userId, String course);

}