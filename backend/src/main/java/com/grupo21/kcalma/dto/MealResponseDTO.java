package com.grupo21.kcalma.dto;

import com.grupo21.kcalma.domain.Meal.Meal;
import com.grupo21.kcalma.domain.Meal.MealType;

import java.time.LocalDateTime;
import java.util.List;

public record MealResponseDTO(Long id, String name, String description, MealType mealType, LocalDateTime createdAt, List<MealFoodResponseDTO> foods) {

    public static MealResponseDTO create(Meal meal) {

        List<MealFoodResponseDTO> foods = meal.getMealFoods().stream()
                .map(mealFoods -> new MealFoodResponseDTO(
                        mealFoods.getFood().getId(),
                        mealFoods.getFood().getName(),
                        mealFoods.getAmount(),
                        mealFoods.getFood().getMeasureUnit()
                ))
                .toList();

        return new MealResponseDTO(
                meal.getId(),
                meal.getName(),
                meal.getDescription(),
                meal.getMealType(),
                meal.getCreatedAt(),
                foods
        );
    }
}
