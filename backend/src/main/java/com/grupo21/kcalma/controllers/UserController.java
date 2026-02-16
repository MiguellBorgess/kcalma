package com.grupo21.kcalma.controllers;

import com.grupo21.kcalma.domain.user.WeightRecord;
import com.grupo21.kcalma.dto.ChangePasswordRequestDTO;
import com.grupo21.kcalma.dto.UserDetailsResponseDTO;
import com.grupo21.kcalma.dto.WeightRecordDTO;
import com.grupo21.kcalma.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

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

    @PostMapping("/add-weight")
        public ResponseEntity<String> addWeight(@RequestBody WeightRecordDTO data, Principal connectedUser) {

        WeightRecord record = userService.addWeightRecord(data, connectedUser);

        return ResponseEntity.accepted().build();
    }
}
