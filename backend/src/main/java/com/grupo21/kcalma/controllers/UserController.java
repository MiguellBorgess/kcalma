package com.grupo21.kcalma.controllers;

import com.grupo21.kcalma.dto.*;
import com.grupo21.kcalma.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

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

    @PatchMapping("/update")
    public ResponseEntity<UserDetailsResponseDTO> updateUser(@RequestBody UpdateUserDTO data, Principal connectedUser){

        try {
            UserDetailsResponseDTO response = userService.updateUser(data, connectedUser);

            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/add-weight")
        public ResponseEntity<WeightRecordDTO> addWeight(@RequestBody AddWeightRecordDTO data, Principal connectedUser) {

        WeightRecordDTO record = userService.addWeightRecord(data, connectedUser);

        return ResponseEntity.ok(record);
    }

    @DeleteMapping("/del-weight")
    public ResponseEntity<Void> deleteWeight(@RequestBody DeleteWeightRecordDTO data, Principal connectedUser) {

        userService.DeleteWeightRecord(data, connectedUser);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/weight-records")
    public ResponseEntity<List<WeightRecordDTO>> getWeightRecords(Principal connectedUser){

        List<WeightRecordDTO> records = userService.getWeightRecords(connectedUser);

        return  ResponseEntity.ok(records);
    }
}
