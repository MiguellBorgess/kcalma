package com.grupo21.kcalma.dto;

import com.grupo21.kcalma.domain.food.MeasureUnit;

public record AddFoodDTO(String name, MeasureUnit measureUnit, int calories) {
}
