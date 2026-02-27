package com.grupo21.kcalma.dto;

import com.grupo21.kcalma.domain.Meal.MealFoods;
import com.grupo21.kcalma.domain.food.Food;
import com.grupo21.kcalma.domain.food.MeasureUnit;

import java.util.List;

public record MealFoodItemResponseDTO(Long foodId, String name, double amount, MeasureUnit measureUnit) {
}
