package com.example.forum.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.forum.model.Resource;
import com.example.forum.repository.ResourceRepository;

@Service
public class ResourceService {
    @Autowired
    ResourceRepository rr;
    
    public Resource create(Resource r) {
        return rr.save(r);
    }
    
    public List<Resource> getAllResources() {
        return rr.findAll();
    }
    
    public Resource getResourceById(int id) {
        return rr.findById(id).orElse(null);
    }
    
    public boolean deleteResource(int id) {
        if(this.getResourceById(id) == null) {
            return false;
        }
        rr.deleteById(id);
        return true;
    }
}
