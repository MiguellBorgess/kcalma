package com.grupo21.kcalma.infra.exception;

import com.grupo21.kcalma.exceptions.*;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.nio.file.AccessDeniedException;
import java.security.SignatureException;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<RestErrorMessage> notFoundHandle(NotFoundException e) {
        RestErrorMessage threatResponse = new RestErrorMessage(HttpStatus.BAD_REQUEST, e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(threatResponse);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<RestErrorMessage> userNotFoundHandle(UserNotFoundException e) {
        RestErrorMessage threatResponse = new RestErrorMessage(HttpStatus.FORBIDDEN, e.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(threatResponse);
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<RestErrorMessage> userNotFoundHandle(UsernameNotFoundException e) {
        RestErrorMessage threatResponse = new RestErrorMessage(HttpStatus.FORBIDDEN, e.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(threatResponse);
    }

    @ExceptionHandler(ExistingEmailException.class)
    public ResponseEntity<RestErrorMessage> existingEmailHandle(ExistingEmailException e) {
        RestErrorMessage threatResponse = new RestErrorMessage(HttpStatus.BAD_REQUEST, e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(threatResponse);
    }

    @ExceptionHandler(TokenRefreshException.class)
    public ResponseEntity<RestErrorMessage> tokenRefreshHandle(TokenRefreshException e) {
        RestErrorMessage threatResponse = new RestErrorMessage(HttpStatus.FORBIDDEN, e.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(threatResponse);
    }

    @ExceptionHandler(ChangePasswordException.class)
    public ResponseEntity<RestErrorMessage> changePasswordHandle(ChangePasswordException e) {
        RestErrorMessage threatResponse = new RestErrorMessage(HttpStatus.BAD_REQUEST, e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(threatResponse);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<RestErrorMessage> badCredentialExceptionHandle(BadCredentialsException e) {
        RestErrorMessage threatResponse = new RestErrorMessage(HttpStatus.UNAUTHORIZED, "The username or password is incorrect");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(threatResponse);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<RestErrorMessage> accessDeniedExceptionHandle(AccessDeniedException e) {
        RestErrorMessage threatResponse = new RestErrorMessage(HttpStatus.FORBIDDEN, "You are not authorized to access this resource");
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(threatResponse);
    }

    @ExceptionHandler(SignatureException.class)
    public ResponseEntity<RestErrorMessage> signatureExceptionHandle(SignatureException e) {
        RestErrorMessage threatResponse = new RestErrorMessage(HttpStatus.UNAUTHORIZED, "The JWT signature is invalid");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(threatResponse);
    }

    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<RestErrorMessage> expiredJwtExceptionHandle(ExpiredJwtException e) {
        RestErrorMessage threatResponse = new RestErrorMessage(HttpStatus.UNAUTHORIZED, "The JWT token has expired");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(threatResponse);
    }

    @ExceptionHandler(MalformedJwtException.class)
    public ResponseEntity<RestErrorMessage> malformedJwtExceptionHandle(MalformedJwtException e) {
        RestErrorMessage threatResponse = new RestErrorMessage(HttpStatus.UNAUTHORIZED, "The JWT token is malformed");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(threatResponse);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<RestErrorMessage> handleGenericException(Exception e) {
        RestErrorMessage response = new RestErrorMessage(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<RestErrorMessage> handleIllegalArgumentException(IllegalArgumentException e) {
        RestErrorMessage response = new RestErrorMessage(HttpStatus.BAD_REQUEST, e.getMessage() != null ? e.getMessage() : "Invalid argument");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
}
