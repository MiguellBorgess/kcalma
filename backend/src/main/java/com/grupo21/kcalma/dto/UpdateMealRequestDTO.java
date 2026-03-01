package com.grupo21.kcalma.dto;

import com.grupo21.kcalma.domain.Meal.MealType;

public record UpdateMealRequestDTO(Long id, String name, String description, MealType mealType) {
}
