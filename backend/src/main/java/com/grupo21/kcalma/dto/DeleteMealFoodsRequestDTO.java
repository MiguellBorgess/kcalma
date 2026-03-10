package com.grupo21.kcalma.dto;

import java.util.List;

public record DeleteMealFoodsRequestDTO(Long mealId, List<Long> foodsId) {
}
