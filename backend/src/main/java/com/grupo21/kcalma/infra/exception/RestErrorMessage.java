package com.grupo21.kcalma.infra.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
public class RestErrorMessage {
    private HttpStatus status;
    private String message;
}
