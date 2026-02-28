package com.grupo21.kcalma.dto;

import com.grupo21.kcalma.domain.food.MeasureUnit;

public record MealFoodResponseDTO(Long foodId, String name, double amount, MeasureUnit measureUnit) {
}
