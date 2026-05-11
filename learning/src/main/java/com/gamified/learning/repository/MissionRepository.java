package com.gamified.learning.repository;

import com.gamified.learning.model.Mission;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MissionRepository extends JpaRepository<Mission, Long> {

    // Get missions by course (Java, Python, etc.)
    List<Mission> findByCourseIgnoreCase(String course);
}