package com.grupo21.kcalma.dto;

import com.grupo21.kcalma.domain.Meal.Meal;
import com.grupo21.kcalma.domain.Meal.MealType;

import java.time.LocalDateTime;

public record MealResponseDTO(Long id, String name, String description, MealType mealType, LocalDateTime createdAt) {

    public static MealResponseDTO create(Meal meal) {
        return new MealResponseDTO(
                meal.getId(),
                meal.getName(),
                meal.getDescription(),
                meal.getMealType(),
                meal.getCreatedAt()
        );
    }
}
