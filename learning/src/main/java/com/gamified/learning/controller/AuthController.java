package com.gamified.learning.controller;

import com.gamified.learning.model.User;
import com.gamified.learning.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.gamified.learning.service.MissionService;

import java.util.Optional;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MissionService missionService;

    // REGISTER
   @PostMapping("/register")
public String register(@RequestBody User user) {

    User savedUser = userRepository.save(user);

    missionService.generateUserMissions(savedUser.getId(), "Java");
    missionService.generateUserMissions(savedUser.getId(), "C");

    return "User registered successfully";
}

    // LOGIN
   @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody User user) {

    Optional<User> existingUser = userRepository.findByUsername(user.getUsername());

    if (existingUser.isPresent()) {
        User u = existingUser.get();

        if (u.getPassword() != null && u.getPassword().equals(user.getPassword())) {

            // ✅ ADD THIS (IMPORTANT)
            missionService.generateUserMissions(u.getId(), "Java");
            missionService.generateUserMissions(u.getId(), "C");

            return ResponseEntity.ok(Map.of(
        "id", u.getId(),
        "username", u.getUsername(),
        "role", u.getRole(),
        "xp", u.getXp()
));
        }
    }

    return ResponseEntity.status(401).body("INVALID");
}

@PostMapping("/update-xp")
public ResponseEntity<?> updateXp(@RequestBody Map<String, Object> req) {

    Long userId = Long.valueOf(req.get("userId").toString());
    int xp = Integer.parseInt(req.get("xp").toString());

    User user = userRepository.findById(userId).orElse(null);

    if (user == null) {
        return ResponseEntity.status(404).body("User not found");
    }

    user.setXp(user.getXp() + xp);
    userRepository.save(user);

    return ResponseEntity.ok("XP updated successfully");
}

@GetMapping("/user/{id}")
public User getUser(@PathVariable Long id) {
    return userRepository.findById(id).orElse(null);
}
}