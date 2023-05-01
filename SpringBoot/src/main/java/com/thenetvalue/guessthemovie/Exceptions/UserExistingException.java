package com.thenetvalue.guessthemovie.Exceptions;

public class UserExistingException extends RuntimeException{
    public UserExistingException(String message){
        super(message);
    }
}
