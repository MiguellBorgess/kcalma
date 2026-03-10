package com.grupo21.kcalma.dto;

public record ValidatePasswordResetTokenDTO(Boolean isValid, Boolean isNotExpired) {
}
