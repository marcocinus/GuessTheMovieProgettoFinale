package com.thenetvalue.guessthemovie.services;

import com.thenetvalue.guessthemovie.models.User;

import java.util.List;

public interface UserService {
    public List<User> getAllUsers();
    public User getUser(Long id);
    public void addUser(User user);
    public void updateUser(Long id, User user);
    public void deleteUser(Long id);
    public User authenticateUser(String username, String password);
}
