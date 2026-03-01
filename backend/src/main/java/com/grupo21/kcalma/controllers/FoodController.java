package com.grupo21.kcalma.controllers;

import com.grupo21.kcalma.dto.*;
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
    public ResponseEntity<List<FoodResponseDTO>> addFood(@RequestBody List<AddFoodRequestDTO> foods){
        List<FoodResponseDTO> response = foodService.addFoods(foods);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<FoodResponseDTO>> getAll(){
        List<FoodResponseDTO> response = foodService.getAll();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/get")
    public ResponseEntity<FoodResponseDTO> getByName(@RequestBody FoodByNameRequestDTO data){
        FoodResponseDTO response = foodService.getByName(data);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete")
    public void deleteById(@RequestBody DeleteFoodRequestDTO data){
        foodService.deleteById(data);
    }

    @PatchMapping("/update")
    public ResponseEntity<FoodResponseDTO> updateFood(@RequestBody UpdateFoodRequestDTO data){
        FoodResponseDTO response = foodService.updateFood(data);

        return ResponseEntity.ok(response);
    }
}
