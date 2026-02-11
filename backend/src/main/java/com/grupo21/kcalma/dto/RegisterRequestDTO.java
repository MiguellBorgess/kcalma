package com.grupo21.kcalma.dto;

import com.grupo21.kcalma.domain.user.UserRole;

public record RegisterRequestDTO(String name, String email, String password, UserRole role) {
}
