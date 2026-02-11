package com.grupo21.kcalma.exceptions;

public class NotFoundException extends RuntimeException{
    public NotFoundException() { super("Not Found"); }

    public NotFoundException(String message) { super(message); }
}
