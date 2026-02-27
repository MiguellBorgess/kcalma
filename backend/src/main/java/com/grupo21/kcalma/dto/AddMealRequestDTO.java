package com.grupo21.kcalma.dto;

import com.grupo21.kcalma.domain.Meal.MealType;

public record AddMealRequestDTO(String name, String description, MealType mealType) {
}
