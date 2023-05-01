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

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return userServiceDB.authenticateUser(user.getUsername(), user.getPassword());
    }
}

