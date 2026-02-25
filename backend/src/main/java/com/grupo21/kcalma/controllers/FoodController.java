package com.grupo21.kcalma.controllers;

import com.grupo21.kcalma.dto.AddFoodDTO;
import com.grupo21.kcalma.dto.FoodByNameRequestDTO;
import com.grupo21.kcalma.dto.FoodResponseDTO;
import com.grupo21.kcalma.services.FoodService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/food")
@RequiredArgsConstructor
public class FoodController {
    private final FoodService foodService;

    @PostMapping("/add")
    public ResponseEntity<FoodResponseDTO> addFood(@RequestBody AddFoodDTO food, Principal connectedUser){
        FoodResponseDTO response = foodService.addFood(food, connectedUser);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<FoodResponseDTO>> getAll(Principal connectedUser){
        List<FoodResponseDTO> response = foodService.getAll(connectedUser);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/get")
    public ResponseEntity<FoodResponseDTO> getByName(@RequestBody FoodByNameRequestDTO data, Principal connectedUser){
        FoodResponseDTO response = foodService.getByName(data, connectedUser);

        return ResponseEntity.ok(response);
    }
    
}
