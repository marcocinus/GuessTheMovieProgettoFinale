package com.thenetvalue.guessthemovie.Exceptions;

//classe exception in caso di password errata
public class PasswordException extends RuntimeException{
    public PasswordException(String message){
        super(message);
    }
}
