package com.grupo21.kcalma.dto;

import com.grupo21.kcalma.domain.Meal.MealType;

import java.util.List;

public record AddMealRequestDTO(String name, String description, MealType mealType, List<MealFoodItemRequestDTO> mealFoods) {
}
