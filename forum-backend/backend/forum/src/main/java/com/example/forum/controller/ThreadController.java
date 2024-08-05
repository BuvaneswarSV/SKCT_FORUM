package com.example.forum.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.forum.model.Thread;
import com.example.forum.service.ThreadService;

@RestController
@RequestMapping("/thread")
public class ThreadController {
    @Autowired
    ThreadService ts;
    
    @PostMapping("/post")
    public ResponseEntity<Thread> add(@RequestBody Thread t) {
        Thread newThread = ts.create(t);
        return new ResponseEntity<>(newThread, HttpStatus.CREATED);
    }
    
    @GetMapping("/getdetails")
    public ResponseEntity<List<Thread>> getAllThreads() {
        List<Thread> obj = ts.getAllThreads();
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }
    
    @PutMapping("/update/{threadId}")
    public ResponseEntity<Thread> update(@PathVariable("threadId") int id, @RequestBody Thread t) {
        if(ts.updateThread(id, t)) {
            return new ResponseEntity<>(t, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }
    
    @DeleteMapping("/delete/{threadId}")
    public ResponseEntity<Boolean> delete(@PathVariable("threadId") int id) {
        if(ts.deleteThread(id)) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
    }
}