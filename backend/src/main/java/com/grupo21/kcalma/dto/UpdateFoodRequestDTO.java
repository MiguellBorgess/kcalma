package com.grupo21.kcalma.dto;

import com.grupo21.kcalma.domain.food.MeasureUnit;
import lombok.Data;

@Data
public class UpdateFoodRequestDTO {
    Long id;
    String name;
    MeasureUnit measureUnit;
    int calories;
    boolean updateCalories;
}
