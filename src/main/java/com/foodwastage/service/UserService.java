package com.foodwastage.service;

import com.foodwastage.model.User;
import com.foodwastage.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        return userRepository.save(user);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
 // Update user details (username or password)
    public User updateUser(User user) {
        return userRepository.save(user);
    }
    
    
}