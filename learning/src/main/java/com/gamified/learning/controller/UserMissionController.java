package com.gamified.learning.controller;

import com.gamified.learning.model.UserMission;
import com.gamified.learning.repository.UserMissionRepository;
import com.gamified.learning.service.MissionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user-missions")
@CrossOrigin(origins = "*")
public class UserMissionController {

    @Autowired
    private UserMissionRepository repo;

    @Autowired
    private MissionService missionService;

    // =========================
    // GET USER MISSIONS
    // =========================
    @GetMapping
    public List<UserMission> getUserMissions(
            @RequestParam Long userId,
            @RequestParam String course
    ) {
        return repo.findByUserIdAndCourse(userId, course);
    }

    // =========================
    // GENERATE MISSIONS (AUTO INIT)
    // =========================
    @PostMapping("/generate")
    public String generate(@RequestBody Map<String, Object> req) {

        Long userId = Long.valueOf(req.get("userId").toString());
        String course = req.get("course").toString();

        missionService.generateUserMissions(userId, course);

        return "User missions created successfully!";
    }

    // =========================
    // COMPLETE MISSION + UNLOCK NEXT
    // =========================
    @PostMapping("/complete")
    public UserMission complete(@RequestBody Map<String, Object> req) {

        Long userMissionId = Long.valueOf(req.get("userMissionId").toString());

        UserMission current = repo.findById(userMissionId).orElse(null);

        if (current == null) {
            return null;
        }

        // ✅ mark current mission completed
        current.setCompleted(true);
        current.setProgress(100);
        repo.save(current);

        // 🔥 unlock next mission in same course for same user
        List<UserMission> missions =
                repo.findByUserIdAndCourse(current.getUserId(), current.getCourse());

        boolean unlockNext = false;

        for (UserMission m : missions) {

            if (unlockNext) {
                m.setUnlocked(true);
                repo.save(m);
                break;
            }

            if (m.getId().equals(userMissionId)) {
                unlockNext = true;
            }
        }

        return current;
    }
}