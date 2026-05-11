package com.gamified.learning.repository;

import com.gamified.learning.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    List<Question> findByMissionId(Long missionId);
}