package com.example.forum.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.forum.model.Thread;
import com.example.forum.repository.ThreadRepository;

@Service
public class ThreadService {
    @Autowired
    ThreadRepository tr;
    
    public Thread create(Thread t) {
        return tr.save(t);
    }
    
    public List<Thread> getAllThreads() {
        return tr.findAll();
    }
    
    public Thread getThreadById(int id) {
        Optional<Thread> optional = tr.findById(id);
        return optional.orElse(null);
    }
    
    public boolean updateThread(int id, Thread t) {
        if(this.getThreadById(id) == null) {
            return false;
        }
        t.setId(id);
        tr.save(t);
        return true;
    }
    
    public boolean deleteThread(int id) {
        if(this.getThreadById(id) == null) {
            return false;
        }
        tr.deleteById(id);
        return true;
    }
}
