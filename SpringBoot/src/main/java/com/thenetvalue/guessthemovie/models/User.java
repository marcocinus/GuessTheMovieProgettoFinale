//Questa è la classe User che rappresenta un utente della nostra web application.
// Al suo interno troviamo gli attributi che costiuiscono l'oggetto, i suoi getter e setter e il costruttore.
//Con @Entity e @Table indichiamo che la classe rappresenta una tabella all'interno di un db.

package com.thenetvalue.guessthemovie.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name="users")
public class User {
    //Attributi
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String surname;
    private String email;
    private String username;
    private String password;

    //Costruttori
    public User(){

    }

    //Getter e setter
    public User(Long id, String name, String surname, String email, String username, String password) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.username = username;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
