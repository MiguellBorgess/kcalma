package com.grupo21.kcalma.exceptions;

public class ExistingEmailException extends RuntimeException{
    public ExistingEmailException() {super("The email exists");};

    public ExistingEmailException(String message) {super(message);};
}
