package com.grupo21.kcalma.dto;

import lombok.Data;

@Data
public class UpdateUserRequestDTO {
    private String name;
    private String email;
    private int altura;
}
