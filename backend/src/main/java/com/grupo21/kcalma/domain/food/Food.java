package com.grupo21.kcalma.domain.food;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "foods", uniqueConstraints = {
        @UniqueConstraint(name = "UK_food_user_name", columnNames = {"user_id", "nome"})})
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Food {

    @Id
    @Column(name = "food_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "measure_unit")
    private MeasureUnit measureUnit;

    @Column(nullable = false)
    private int calories;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt; //Se não precisar, retirar depois

    @PrePersist
    protected void onCreate(){
        createdAt = LocalDateTime.now();
    }
}
