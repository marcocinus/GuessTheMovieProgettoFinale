//Eccezione che notifica il mancato ritrovamento di uno user

package com.thenetvalue.guessthemovie.Exceptions;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String message){
        super(message);
    }
}
