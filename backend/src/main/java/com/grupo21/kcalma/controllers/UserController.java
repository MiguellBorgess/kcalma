package com.grupo21.kcalma.controllers;

import com.grupo21.kcalma.dto.ChangePasswordRequestDTO;
import com.grupo21.kcalma.dto.UserDetailsResponseDTO;
import com.grupo21.kcalma.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordRequestDTO data, Principal connectedUser) {
        userService.changePassword(data, connectedUser);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/details")
    public ResponseEntity<UserDetailsResponseDTO> getUserDetails(Principal connectedUser) {
        UserDetailsResponseDTO userDetailsResponseDTO = userService.getUserDetails(connectedUser);

        return ResponseEntity.ok(userDetailsResponseDTO);
    }
}
