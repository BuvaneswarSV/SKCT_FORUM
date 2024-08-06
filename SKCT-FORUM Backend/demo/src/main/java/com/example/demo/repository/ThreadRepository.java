package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.Thread;

public interface ThreadRepository extends JpaRepository<Thread, Long> {
}
