package com.gamified.learning.controller;

import com.gamified.learning.dto.AnswerRequest;
import com.gamified.learning.model.Question;
import com.gamified.learning.model.UserMission;
import com.gamified.learning.repository.QuestionRepository;
import com.gamified.learning.repository.UserMissionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin("*")
public class QuestionController {

    @Autowired
    private QuestionRepository questionRepo;

    @Autowired
    private UserMissionRepository userMissionRepo;

    // ======================
    // GET QUESTIONS
    // ======================
    @GetMapping
    public List<Question> getQuestions(@RequestParam Long missionId) {
        return questionRepo.findByMissionId(missionId);
    }

    // ======================
    // SUBMIT ANSWERS
    // ======================
    @PostMapping("/submit")
    public Map<String, Object> submitAnswers(@RequestBody AnswerRequest req) {

        Map<String, Object> response = new HashMap<>();

        Long userMissionId = req.getUserMissionId();
        Map<Long, String> answers = req.getAnswers();

        // 🔴 check mission
        UserMission userMission =
                userMissionRepo.findById(userMissionId).orElse(null);

        if (userMission == null) {
            response.put("message", "Mission not found");
            return response;
        }

        // 🔴 get questions
        List<Question> questions =
                questionRepo.findByMissionId(userMission.getMissionId());

        int score = 0;

        for (Question q : questions) {

            String correct = q.getCorrectAnswer();
            String given = answers.get(q.getId());

            // ✅ avoid null crash
            if (given != null && correct.equalsIgnoreCase(given)) {
                score++;
            }
        }

        int total = questions.size();
        int percentage = (total == 0) ? 0 : (score * 100) / total;

        // ✅ update progress
        userMission.setProgress(percentage);

        boolean passed = percentage >= 60;

        if (passed) {
            userMission.setCompleted(true);
        }

        userMissionRepo.save(userMission);

        // ======================
        // RESPONSE
        // ======================
        response.put("score", score);
        response.put("total", total);
        response.put("percentage", percentage);
        response.put("passed", passed);

        return response;
    }

    @PostMapping("/add")
public String addQuestion(@RequestBody Question q) {

    questionRepo.save(q);

    return "Question added successfully";
}
}