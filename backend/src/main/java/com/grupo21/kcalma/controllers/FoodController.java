package com.grupo21.kcalma.controllers;

import com.grupo21.kcalma.domain.food.Food;
import com.grupo21.kcalma.dto.AddFoodDTO;
import com.grupo21.kcalma.dto.FoodResponseDTO;
import com.grupo21.kcalma.services.FoodService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.security.Principal;

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
    
}
