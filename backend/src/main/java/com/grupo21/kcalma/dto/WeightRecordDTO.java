package com.grupo21.kcalma.dto;

import java.time.LocalDateTime;

public record WeightRecordDTO(Long weight_id, double peso_kg, LocalDateTime created_at) {
}
