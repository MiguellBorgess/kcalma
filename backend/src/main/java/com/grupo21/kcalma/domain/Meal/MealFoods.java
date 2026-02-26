package com.grupo21.kcalma.domain.Meal;

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
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "meal_food_id")
    private MealFoodId id;

    @Column(nullable = false)
    private double amount;
}