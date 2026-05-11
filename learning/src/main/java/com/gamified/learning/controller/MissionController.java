package com.gamified.learning.controller;

import com.gamified.learning.model.Mission;
import com.gamified.learning.repository.MissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/missions")
@CrossOrigin(origins = "*")
public class MissionController {

    @Autowired
    private MissionRepository missionRepo;

    // Get all missions for a course (MASTER LIST)
    @GetMapping
    public List<Mission> getByCourse(@RequestParam String course) {
        return missionRepo.findByCourseIgnoreCase(course);
    }

    // (optional) add mission (admin use)
    @PostMapping
    public Mission addMission(@RequestBody Mission mission) {
        return missionRepo.save(mission);
    }
}