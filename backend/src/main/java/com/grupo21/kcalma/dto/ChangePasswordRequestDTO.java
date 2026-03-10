package com.grupo21.kcalma.dto;

public record ChangePasswordRequestDTO(String password, String newPassword, String confirmPassword) {
}
