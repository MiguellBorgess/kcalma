package com.grupo21.kcalma.repositories;

import com.grupo21.kcalma.domain.Meal.Meal;
import com.grupo21.kcalma.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface MealRepository extends JpaRepository<Meal, Long> {

    List<Meal> getAllByUser(User user);

    List<Meal> findByUserAndCreatedAtBetween(User user, LocalDateTime start, LocalDateTime end);
}
