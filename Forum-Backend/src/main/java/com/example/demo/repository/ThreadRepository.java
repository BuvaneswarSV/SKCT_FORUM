package com.example.demo.repository;

import com.example.demo.model.Thread;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ThreadRepository extends JpaRepository<Thread, Long> {
    List<Thread> findAllByOrderByCreatedAtDesc();
}
