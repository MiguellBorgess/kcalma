package com.grupo21.kcalma.dto;

import java.time.LocalDateTime;

public record WeightRecordResponseDTO(Long weight_id, double peso_kg, LocalDateTime created_at) {
}
