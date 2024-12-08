package com.foodwastage.controller;

import com.foodwastage.model.User;
import com.foodwastage.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")  // Base path for authentication-related requests
public class UserController {

    @Autowired
    private UserService userService;

    // Register a new user
    @PostMapping("/signup")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        // Check if the email already exists in the database
        User existingUser = userService.findByEmail(user.getEmail());
        if (existingUser != null) {
            return ResponseEntity.badRequest().body("Email already in use.");
        }

        // Set default role as USER if not provided
        if (user.getRole() == null) {
            user.setRole(User.Role.USER);  // Default role is USER
        }

        // Save the new user in the database
        userService.registerUser(user);
        return ResponseEntity.ok("User registered successfully.");
    }

    // Login the user
    @PostMapping("/signin")
    public ResponseEntity<String> loginUser(@RequestBody User user) {
        // Check if the user exists in the database
        User existingUser = userService.findByEmail(user.getEmail());
        if (existingUser == null || !existingUser.getPassword().equals(user.getPassword())) {
            return ResponseEntity.badRequest().body("Invalid credentials.");
        }

        // Ideally, you'd issue a token here, such as a JWT token for the logged-in user
        // In this example, let's just return a success message with the role of the user
        return ResponseEntity.ok("Login successful. Role: " + existingUser.getRole());
    }
    
    // Update username
    @PutMapping("/update-username/{email}")
    public ResponseEntity<String> updateUsername(@PathVariable String email, @RequestBody String newUsername) {
        User user = userService.findByEmail(email);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found.");
        }

        user.setUsername(newUsername);
        userService.updateUser(user);  // Ensure this method properly updates the user in the database
        return ResponseEntity.ok("Username updated successfully.");
    }

    // Update password
    @PutMapping("/update-password/{email}")
    public ResponseEntity<String> updatePassword(@PathVariable String email, @RequestBody String newPassword) {
        User user = userService.findByEmail(email);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found.");
        }

        user.setPassword(newPassword);
        userService.updateUser(user);  // Ensure this method properly updates the user in the database
        return ResponseEntity.ok("Password updated successfully.");
    }

    // Get user profile by email (to show username and email)
    @GetMapping("/profile/{email}")
    public ResponseEntity<User> getUserProfile(@PathVariable String email) {
        User user = userService.findByEmail(email);
        if (user == null) {
            return ResponseEntity.badRequest().body(null);
        }
        return ResponseEntity.ok(user);
    }
}