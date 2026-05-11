package com.gamified.learning.model;

import jakarta.persistence.*;

@Entity
@Table(name = "mission")
public class Mission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private String difficulty;

    private boolean unlocked;

    private int progress;

    private String course;

    // 🔹 Default Constructor (REQUIRED)
    public Mission() {
    }

    // 🔹 Parameterized Constructor (optional but useful)
    public Mission(String title, String description, String difficulty, boolean unlocked, int progress, String course) {
        this.title = title;
        this.description = description;
        this.difficulty = difficulty;
        this.unlocked = unlocked;
        this.progress = progress;
        this.course = course;
    }

    // 🔹 Getters and Setters

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public boolean isUnlocked() {
        return unlocked;
    }

    public void setUnlocked(boolean unlocked) {
        this.unlocked = unlocked;
    }

    public int getProgress() {
        return progress;
    }

    public void setProgress(int progress) {
        this.progress = progress;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }
}