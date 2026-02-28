package com.grupo21.kcalma.domain.Meal;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class MealFoodId implements Serializable {
    @Column(name = "meal_id")
    private Long mealId;

    @Column(name = "food_id")
    private Long foodId;
}
