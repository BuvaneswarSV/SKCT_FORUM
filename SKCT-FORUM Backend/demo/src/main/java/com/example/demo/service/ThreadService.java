package com.example.demo.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.model.Thread;
import com.example.demo.repository.ThreadRepository;

@Service
public class ThreadService {
    @Autowired
    private ThreadRepository threadRepository;

    public List<Thread> getAllThreads() {
        return threadRepository.findAll();
    }

    public Thread getThreadById(Long threadid) {
        return threadRepository.findById(threadid).orElse(null);
    }

    public Thread saveThread(Thread thread) {
        return threadRepository.save(thread);
    }

    public void deleteThread(Long threadid) {
        threadRepository.deleteById(threadid);
    }
}
