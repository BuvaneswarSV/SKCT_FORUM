package com.example.forum.repository;

// import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.forum.model.User;

public interface UserRepo extends JpaRepository<User, Long> {
    User findByEmail(String email);
    // Optional<User> findByEmail(String email);
}
