package com.grupo21.kcalma.exceptions;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException() { super("User Not Found"); }

    public UserNotFoundException(String message) { super(message); }
}
