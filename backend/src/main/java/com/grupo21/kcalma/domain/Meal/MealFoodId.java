package com.grupo21.kcalma.domain.Meal;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class MealFoodId implements Serializable {
    @Column(name = "meal_id")
    private Long mealId;

    @Column(name = "food_id")
    private Long foodId;
}
