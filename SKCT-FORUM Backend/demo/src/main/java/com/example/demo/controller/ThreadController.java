package com.example.demo.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.demo.model.Thread;
import com.example.demo.service.ThreadService;

@RestController
@RequestMapping("/thread")
public class ThreadController {
    @Autowired
    private ThreadService threadService;

    @GetMapping
    public List<Thread> getAllThreads() {
        return threadService.getAllThreads();
    }

    @GetMapping("/{threadid}")
    public Thread getThreadById(@PathVariable Long threadid) {
        return threadService.getThreadById(threadid);
    }

    @PostMapping
    public Thread createThread(@RequestBody Thread thread) {
        return threadService.saveThread(thread);
    }

    @PutMapping("/{threadid}")
    public Thread updateThread(@PathVariable Long threadid, @RequestBody Thread thread) {
        thread.setThreadid(threadid);
        return threadService.saveThread(thread);
    }

    @DeleteMapping("/{threadid}")
    public void deleteThread(@PathVariable Long threadid) {
        threadService.deleteThread(threadid);
    }
}
