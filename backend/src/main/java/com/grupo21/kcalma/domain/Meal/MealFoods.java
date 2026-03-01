package com.grupo21.kcalma.domain.Meal;

import com.grupo21.kcalma.domain.food.Food;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "meals_foods")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MealFoods {
    @EmbeddedId
    private MealFoodId id;

    @ManyToOne
    @MapsId("mealId")
    @JoinColumn(name = "meal_Id")
    private Meal meal;

    @ManyToOne
    @MapsId("foodId")
    @JoinColumn(name = "food_Id")
    private Food food;

    @Column(nullable = false)
    private double amount;
}