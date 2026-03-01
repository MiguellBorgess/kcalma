package com.grupo21.kcalma.dto;

import com.grupo21.kcalma.domain.Meal.Meal;
import com.grupo21.kcalma.domain.Meal.MealType;
import com.grupo21.kcalma.domain.food.Food;

import java.time.LocalDateTime;
import java.util.List;

public record MealResponseDTO(Long id, String name, String description, MealType mealType, LocalDateTime createdAt, double totalCalories, List<MealFoodResponseDTO> foods) {

    public static MealResponseDTO create(Meal meal, double totalCalories) {

        List<MealFoodResponseDTO> foods = meal.getMealFoods().stream()
                .map(mealFoods -> {
                    Food food = mealFoods.getFood();
                    return new MealFoodResponseDTO(
                            food.getId(),
                            food.getName(),
                            mealFoods.getAmount(),
                            mealFoods.getFood().getCalories() * mealFoods.getAmount(),
                            food.getMeasureUnit()
                    );
                })
                .toList();

        return new MealResponseDTO(
                meal.getId(),
                meal.getName(),
                meal.getDescription(),
                meal.getMealType(),
                meal.getCreatedAt(),
                totalCalories,
                foods
        );
    }
}
