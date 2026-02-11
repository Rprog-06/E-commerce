package com.rizwan.demo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.rizwan.demo.dto.LoginRequest;
import com.rizwan.demo.dto.LoginResponse;


import com.rizwan.demo.entity.Users;
import com.rizwan.demo.service.UserService;
import com.rizwan.demo.dto.UserRegisterRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<Users> createUser(@Valid @RequestBody UserRegisterRequest user) {
        Users createdUser = userService.registerUser(user);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
                
    }


    @GetMapping("/{id}")
    public Users getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @GetMapping
    public List<Users> getAllUsers() {
        return userService.getAllUsers();
    }
     @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest request
    ) {
        LoginResponse response = userService.login(
                request.getEmail(),
                request.getPassword()
        );

        
                return ResponseEntity.ok(response);
    }
}
