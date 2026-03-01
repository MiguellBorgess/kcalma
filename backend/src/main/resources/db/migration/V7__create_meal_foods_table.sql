CREATE TABLE meals_foods (
    meal_id BIGINT NOT NULL,
    food_id BIGINT NOT NULL,
    amount DOUBLE NOT NULL,
    PRIMARY KEY (meal_id, food_id),
    CONSTRAINT fk_meal_foods_meal
        FOREIGN KEY (meal_id) REFERENCES meals(meal_id),
    CONSTRAINT fk_meal_foods_food
        FOREIGN KEY (food_id) REFERENCES foods(food_id)
);