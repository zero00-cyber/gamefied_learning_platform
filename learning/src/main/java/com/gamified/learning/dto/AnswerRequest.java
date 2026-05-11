package com.gamified.learning.dto;

import java.util.Map;

public class AnswerRequest {

    private Long userMissionId;
    private Map<Long, String> answers; // questionId → selected option

    public Long getUserMissionId() {
        return userMissionId;
    }

    public void setUserMissionId(Long userMissionId) {
        this.userMissionId = userMissionId;
    }

    public Map<Long, String> getAnswers() {
        return answers;
    }

    public void setAnswers(Map<Long, String> answers) {
        this.answers = answers;
    }
}