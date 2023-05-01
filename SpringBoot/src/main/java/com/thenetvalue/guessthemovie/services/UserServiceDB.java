package com.thenetvalue.guessthemovie.services;


import com.thenetvalue.guessthemovie.Exceptions.PasswordException;
import com.thenetvalue.guessthemovie.Exceptions.UserExistingException;
import com.thenetvalue.guessthemovie.Exceptions.UserNotFoundException;
import com.thenetvalue.guessthemovie.models.User;
import com.thenetvalue.guessthemovie.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceDB implements UserService {
    @Autowired
    private UserRepository userRepository;

    /**
     * Metodo che restituisce tutti gli user all'interno del database
     * @return
     */
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }
    public User getUser(Long id){
        Optional<User> user = this.userRepository.findById(id);
        if(user.isPresent()){
            return user.get();
        } else {
            return null;
        }
    }
    public void addUser(User user) {
        if(userRepository.findByUsername(user.getUsername()) == null) {
            userRepository.save(user);
        } else {
            throw new UserExistingException("Username già esistente");
        }
    }
    public void updateUser(Long id, User user){
        Optional<User> existingUser = userRepository.findById(id);
        if(existingUser.isPresent()){
            User u = existingUser.get();
            u.setName(user.getName());
            u.setSurname(user.getSurname());
            u.setEmail(user.getEmail());
            u.setUsername(user.getUsername());
            userRepository.save(u);
        } else {
            throw new UserNotFoundException("Utente con ID: " + id + " non trovato.");
        }
    }
    public void deleteUser(Long id){
        userRepository.deleteById(id);
    }

    //aggiunto controllo username e password
    public User authenticateUser(String username, String password){
        User user = userRepository.findByUsername(username);
        if(user != null && user.getPassword().equals(password)){
            return user;
        }else{
            throw new PasswordException("Password Errata");
        }
    }
}
