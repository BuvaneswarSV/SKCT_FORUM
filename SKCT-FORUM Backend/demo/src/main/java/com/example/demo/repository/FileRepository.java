package com.example.demo.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.File;

public interface FileRepository extends JpaRepository<File, Long> {
}
