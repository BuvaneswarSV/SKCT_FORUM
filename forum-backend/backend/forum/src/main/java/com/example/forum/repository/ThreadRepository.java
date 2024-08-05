package com.example.forum.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.forum.model.Thread;

public interface ThreadRepository extends JpaRepository<Thread, Integer> {
}
