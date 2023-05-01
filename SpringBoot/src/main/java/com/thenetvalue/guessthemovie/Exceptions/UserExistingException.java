package com.thenetvalue.guessthemovie.Exceptions;

//exception in caso di username gia esistente in fase di registrazione
public class UserExistingException extends RuntimeException{
    public UserExistingException(String message){
        super(message);
    }
}
