package com.gamified.learning.service;

import com.gamified.learning.model.Mission;
import com.gamified.learning.model.UserMission;
import com.gamified.learning.repository.MissionRepository;
import com.gamified.learning.repository.UserMissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MissionService {

    @Autowired
    private MissionRepository missionRepo;

    @Autowired
    private UserMissionRepository userMissionRepo;

    // ✅ AUTO GENERATE MISSIONS FOR USER + COURSE
    public void generateUserMissions(Long userId, String course) {

        // 🔥 prevent duplicates
        if (!userMissionRepo.findByUserIdAndCourse(userId, course).isEmpty()) {
            return;
        }

        List<Mission> missions = missionRepo.findByCourseIgnoreCase(course);

        boolean first = true;

        for (Mission m : missions) {

            UserMission um = new UserMission();

            um.setUserId(userId);
            um.setMissionId(m.getId());
            um.setCourse(course);

            um.setProgress(0);
            um.setCompleted(false);

            // 🔥 ONLY FIRST MISSION UNLOCKED
            if (first) {
                um.setUnlocked(true);
                first = false;
            } else {
                um.setUnlocked(false);
            }

            userMissionRepo.save(um);
        }
    }

    // ✅ FETCH USER MISSIONS
    public List<UserMission> getUserMissions(Long userId, String course) {
        return userMissionRepo.findByUserIdAndCourse(userId, course);
    }
}