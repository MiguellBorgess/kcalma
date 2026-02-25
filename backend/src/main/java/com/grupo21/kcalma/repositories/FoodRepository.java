package com.grupo21.kcalma.repositories;

import com.grupo21.kcalma.domain.food.Food;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodRepository extends JpaRepository<Food, Long> {
}
