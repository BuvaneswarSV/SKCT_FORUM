package com.example.demo.controller;

// import java.util.List;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.*;
import com.example.demo.model.Thread;
import com.example.demo.service.ThreadService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

// @RestController
// @RequestMapping("/thread")
// public class ThreadController {
//     @Autowired
//     private ThreadService threadService;

//     @GetMapping
//     public List<Thread> getAllThreads() {
//         return threadService.getAllThreads();
//     }

//     @GetMapping("/{threadid}")
//     public Thread getThreadById(@PathVariable Long threadid) {
//         return threadService.getThreadById(threadid);
//     }

//     @PostMapping
//     public Thread createThread(@RequestBody Thread thread) {
//         return threadService.saveThread(thread);
//     }

//     @PutMapping("/{threadid}")
//     public Thread updateThread(@PathVariable Long threadid, @RequestBody Thread thread) {
//         thread.setThreadid(threadid);
//         return threadService.saveThread(thread);
//     }

//     @DeleteMapping("/{threadid}")
//     public void deleteThread(@PathVariable Long threadid) {
//         threadService.deleteThread(threadid);
//     }
// }




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
@RequestMapping("/api/threads")
@Tag(name = "Authorization", description = "Endpoints for user authentication")
public class ThreadController {
    @Autowired
    private ThreadService threadService;

    @GetMapping
    public List<Thread> getAllThreads() {
        return threadService.getAllThreads();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Thread> getThreadById(@PathVariable Long id) {
        return ResponseEntity.ok(threadService.getThreadById(id));
    }

    @PostMapping
    public ResponseEntity<Thread> createThread(@RequestPart("thread") Thread thread, @RequestPart("file") MultipartFile file) {
        // Handle file upload logic here, save file URL to thread, and then save thread
        return ResponseEntity.ok(threadService.createThread(thread));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteThread(@PathVariable Long id) {
        threadService.deleteThread(id);
        return ResponseEntity.noContent().build();
    }
}
