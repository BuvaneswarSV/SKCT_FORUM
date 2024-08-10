package com.example.forum.repository;

import com.example.forum.model.Thread;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ThreadRepo extends JpaRepository<Thread, Long> {
}
