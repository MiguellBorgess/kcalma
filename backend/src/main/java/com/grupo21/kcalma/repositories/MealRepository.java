package com.grupo21.kcalma.repositories;

import com.grupo21.kcalma.domain.Meal.Meal;
import com.grupo21.kcalma.domain.user.User;
import com.grupo21.kcalma.dto.CaloriesByDateDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface MealRepository extends JpaRepository<Meal, Long> {

    List<Meal> getAllByUser(User user);

    List<Meal> findByUserAndCreatedAtBetween(User user, LocalDateTime start, LocalDateTime end);

    @Query(value = """
    SELECT AVG(daily_total) FROM (
        SELECT DATE(m.created_at) as day,
               SUM((f.calories / 100.0) * mf.amount) as daily_total
        FROM meals m
        JOIN meals_foods mf ON m.meal_id = mf.meal_id
        JOIN foods f ON mf.food_id = f.food_id
        WHERE m.user_id = :userId
          AND YEAR(m.created_at) = :year
          AND MONTH(m.created_at) = :month
        GROUP BY DATE(m.created_at)
    ) as daily
    """, nativeQuery = true)
    Double getAverageCaloriesByMonth(@Param("userId") String userId, @Param("year") int year, @Param("month") int month);

    @Query(value = """
    SELECT DATE(m.created_at) as date,
           SUM((f.calories / 100.0) * mf.amount) as calories
    FROM meals m
    JOIN meals_foods mf ON mf.meal_id = m.meal_id
    JOIN foods f ON f.food_id = mf.food_id
    WHERE m.user_id = :userId
    AND YEAR(m.created_at) = :year
    AND MONTH(m.created_at) = :month
    GROUP BY DATE(m.created_at)
    ORDER BY DATE(m.created_at)
    """, nativeQuery = true)
    List<CaloriesByDateDTO> getCaloriesByDate(String userId, int year, int month);
}
