package com.gamified.learning.controller;

import com.gamified.learning.model.User;
import com.gamified.learning.repository.UserRepository;
import com.gamified.learning.service.MissionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepo;
      @Autowired
    private MissionService missionService;

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody User req) {

        Map<String, Object> res = new HashMap<>();

        User user = userRepo.findByUsername(req.getUsername()).orElse(null);

        if (user != null && user.getPassword().equals(req.getPassword())) {
            res.put("success", true);
            res.put("user", user);
        } else {
            res.put("success", false);
        }

        return res;
    }

// after login OR registration
@PostMapping("/login-success")
public String loginSuccess(@RequestBody Map<String, Object> request) {

    Long userId = Long.valueOf(request.get("userId").toString());
    String course = request.get("course").toString();

    missionService.generateUserMissions(userId, course);

    return "Missions generated";
}
}