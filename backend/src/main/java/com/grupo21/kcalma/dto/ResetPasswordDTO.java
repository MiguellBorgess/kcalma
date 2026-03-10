package com.grupo21.kcalma.dto;

public record ResetPasswordDTO(String token, String password, String confirmPassword) {
}
