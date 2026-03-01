package com.grupo21.kcalma.dto;

import java.util.List;

public record AddMealFoodRequestDTO(Long mealId, List<MealFoodItemRequestDTO> mealFoods) {
}
