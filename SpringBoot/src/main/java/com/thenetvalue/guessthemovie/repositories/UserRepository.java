package com.thenetvalue.guessthemovie.repositories;

import com.thenetvalue.guessthemovie.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String Username);
}
