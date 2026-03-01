package com.grupo21.kcalma.repositories;

import com.grupo21.kcalma.domain.food.Food;
import com.grupo21.kcalma.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FoodRepository extends JpaRepository<Food, Long> {

    List<Food> getAllByUser(User user);

    Food getByNameAndUser(String name, User user);
}
