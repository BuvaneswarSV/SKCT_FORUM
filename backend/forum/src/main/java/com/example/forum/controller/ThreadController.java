package com.example.forum.controller;

import com.example.forum.model.Thread;
// import com.example.forum.model.User;
// import com.example.forum.service.ThreadService;
// import com.example.forum.service.UserService;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/threads")
// public class ThreadController {

//     @Autowired
//     private ThreadService threadService;

//     @Autowired
//     private UserService userService;

//     @PostMapping
// public ResponseEntity<Thread> createThread(@RequestBody Thread thread) {
//     User user = userService.getUserById(thread.getUser().getId());
//     if (user == null) {
//         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//     }
//     thread.setUser(user); // Set the user reference on the thread
//     Thread newThread = threadService.createThread(thread);
//     return new ResponseEntity<>(newThread, HttpStatus.CREATED);
// }


//     @GetMapping
//     public ResponseEntity<List<Thread>> getAllThreads() {
//         List<Thread> threads = threadService.getAllThreads();
//         return new ResponseEntity<>(threads, HttpStatus.OK);
//     }

//     @GetMapping("/{id}")
//     public ResponseEntity<Thread> getThreadById(@PathVariable Long id) {
//         Thread thread = threadService.getThreadById(id);
//         if (thread == null) {
//             return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//         }
//         return new ResponseEntity<>(thread, HttpStatus.OK);
//     }

//     @PutMapping("/{id}")
//     public ResponseEntity<Thread> updateThread(@PathVariable Long id, @RequestBody Thread thread) {
//         Thread updatedThread = threadService.updateThread(id, thread);
//         if (updatedThread == null) {
//             return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//         }
//         return new ResponseEntity<>(updatedThread, HttpStatus.OK);
//     }

//     @DeleteMapping("/{id}")
//     public ResponseEntity<Boolean> deleteThread(@PathVariable Long id) {
//         boolean isDeleted = threadService.deleteThread(id);
//         if (isDeleted) {
//             return new ResponseEntity<>(true, HttpStatus.OK);
//         }
//         return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
//     }
// }





// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;
// import org.springframework.web.multipart.MultipartFile;

// import com.example.forum.service.ThreadService;
// import com.fasterxml.jackson.databind.ObjectMapper;

// import lombok.RequiredArgsConstructor;

// import java.util.List;

// @RestController
// @CrossOrigin(origins = "http://localhost:5173")
// @RequiredArgsConstructor
// @RequestMapping("/api/threads")
// // @Tag(name = "Authorization", description = "Endpoints for user authentication")
// public class ThreadController {
//     @Autowired
//     private ThreadService threadService;

//     @GetMapping
//     public List<Thread> getAllThreads() {
//         return threadService.getAllThreads();
//     }

//     @GetMapping("/{id}")
//     public ResponseEntity<Thread> getThreadById(@PathVariable Long id) {
//         return ResponseEntity.ok(threadService.getThreadById(id));
//     }

//     // @PostMapping
//     // public ResponseEntity<Thread> createThread(@RequestPart("thread") Thread thread, @RequestPart("file") MultipartFile file) {
//     //     // Handle file upload logic here, save file URL to thread, and then save thread
//     //     return ResponseEntity.ok(threadService.createThread(thread));
//     // }


//     @PostMapping
//     public ResponseEntity<String> createThread(
//         @RequestParam("thread") String threadJson,
//         @RequestParam(value = "file", required = false) MultipartFile file) {
        
//         try {
//             // Convert JSON string to Thread object
//             ObjectMapper objectMapper = new ObjectMapper();
//             Thread thread = objectMapper.readValue(threadJson, Thread.class);
            
//             // Handle file upload logic here, if a file is provided
//             // if (file != null) {
//             //     // Implement file handling logic here
//             // }

//             // Save the thread and return success response
//             return ResponseEntity.ok("Thread created successfully!");
//         } catch (Exception e) {
//             // Handle exception and return error response
//             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error processing the request.");
            
//         }
//     }
//     @DeleteMapping("/{id}")
//     public ResponseEntity<Void> deleteThread(@PathVariable Long id) {
//         threadService.deleteThread(id);
//         return ResponseEntity.noContent().build();
//     }
// }


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.example.forum.service.ThreadService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
@RequestMapping("/api/threads")
public class ThreadController {
    
    @Autowired
    private ThreadService threadService;

    private final String UPLOAD_DIR = "uploads/";

    @GetMapping
    public List<Thread> getAllThreads() {
        return threadService.getAllThreads();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Thread> getThreadById(@PathVariable Long id) {
        return ResponseEntity.ok(threadService.getThreadById(id));
    }

    @PostMapping
    public ResponseEntity<String> createThread(
        @RequestParam("thread") String threadJson,
        @RequestParam(value = "file", required = false) MultipartFile file) {
        
        try {
            // Convert JSON string to Thread object
            ObjectMapper objectMapper = new ObjectMapper();
            Thread thread = objectMapper.readValue(threadJson, Thread.class);

            // Handle file upload logic here, if a file is provided
            if (file != null) {
                String fileName = StringUtils.cleanPath(file.getOriginalFilename());
                Path path = Paths.get(UPLOAD_DIR + fileName);
                Files.createDirectories(path.getParent());
                Files.write(path, file.getBytes());
                // Set file URL or path in thread if needed
            }

            // Save the thread and return success response
            threadService.createThread(thread);
            return ResponseEntity.ok("Thread created successfully!");
        } catch (IOException e) {
            // Handle exception and return error response
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error processing the request.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteThread(@PathVariable Long id) {
        threadService.deleteThread(id);
        return ResponseEntity.noContent().build();
    }
}
