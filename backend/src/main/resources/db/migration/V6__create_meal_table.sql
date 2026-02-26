CREATE TABLE meals (
    meal_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    user_id CHAR(36) NOT NULL,
    meal_type INT NOT NULL,
    total_calories INT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    CONSTRAINT fk_meals_user
        FOREIGN KEY (user_id) REFERENCES users(id)
);