/*Questo codice definisce un controller REST per la gestione degli utenti in un'applicazione web.
Il controller gestisce le richieste HTTP per ottenere, aggiungere, aggiornare e cancellare utenti,
nonché per autenticare gli utenti tramite una richiesta POST al percorso "/login".
Le operazioni di gestione degli utenti sono implementate attraverso un'istanza del servizio UserServiceDB,
che è annotata con @Autowired per la gestione delle dipendenze.*/

package com.thenetvalue.guessthemovie.controllers;

import com.thenetvalue.guessthemovie.models.User;
import com.thenetvalue.guessthemovie.services.UserServiceDB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UsersController {
    @Autowired
    private UserServiceDB userServiceDB;


    @GetMapping("/users")
    public List<User> getAllUsers(){
        return userServiceDB.getAllUsers();
    }
    @GetMapping("/users/{id}")
    public User getUser(@PathVariable Long id){
        return userServiceDB.getUser(id);
    }
    @PostMapping("/users")
    public void addUser(@RequestBody User user){
        userServiceDB.addUser(user);
    }
    @RequestMapping(value = "/users/{id}", method = RequestMethod.PUT)
    public void updateUser(@PathVariable Long id, @RequestBody User user){
        userServiceDB.updateUser(id, user);
    }
    @RequestMapping(value = "/users/{id}", method = RequestMethod.DELETE)
    public void deleteUser(@PathVariable Long id){
        userServiceDB.deleteUser(id);
    }

    //chiamata POST per autenticare l'utente alla pagina di login
    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return userServiceDB.authenticateUser(user.getUsername(), user.getPassword());
    }
}

