package com.grupo21.kcalma.controllers;

import com.grupo21.kcalma.dto.*;
import com.grupo21.kcalma.services.MealService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/meal")
@RequiredArgsConstructor
public class MealController {
    private final MealService mealService;

    @PostMapping("/add")
    public ResponseEntity<MealResponseDTO> addMeal(@RequestBody AddMealRequestDTO data, Principal connectedUser){
        MealResponseDTO response = mealService.addMeal(data, connectedUser);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<MealResponseDTO>> getAll(Principal connectedUser){
        List<MealResponseDTO> response = mealService.getAllMeals(connectedUser);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/get")
    public ResponseEntity<MealResponseDTO> getById(@RequestBody MealByIdRequestDTO data, Principal connectedUser){
        MealResponseDTO response = mealService.getMealById(data, connectedUser);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteById(@RequestBody MealByIdRequestDTO data, Principal connectedUser){
        mealService.deleteById(data, connectedUser);

        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/update")
    public ResponseEntity<MealResponseDTO> updateMeal(@RequestBody UpdateMealRequestDTO data, Principal connectedUser){
        MealResponseDTO response = mealService.updateMeal(data, connectedUser);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/add-foods")
    public ResponseEntity<MealResponseDTO> addMealFoods (@RequestBody AddMealFoodRequestDTO data, Principal connectedUser){
        MealResponseDTO response = mealService.addMealFoods(data, connectedUser);

        return ResponseEntity.ok(response);
    }
}