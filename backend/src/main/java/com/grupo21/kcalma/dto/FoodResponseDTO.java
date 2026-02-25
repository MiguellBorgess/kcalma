package com.grupo21.kcalma.dto;

import com.grupo21.kcalma.domain.food.Food;

import java.time.LocalDateTime;

public record FoodResponseDTO(Long id, String name, int calories, LocalDateTime created_at) {

    public static FoodResponseDTO create(Food food){
        return new FoodResponseDTO(
                food.getId(),
                food.getName(),
                food.getCalories(),
                food.getCreatedAt()
        );
    }
}
