package com.example.forum.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.forum.model.Post;
import com.example.forum.repository.PostRepository;

@Service
public class PostService {
    @Autowired
    PostRepository pr;
    
    public Post create(Post p) {
        return pr.save(p);
    }
    
    public List<Post> getAllPosts() {
        return pr.findAll();
    }
    
    public Post getPostById(int id) {
        return pr.findById(id).orElse(null);
    }
    
    public boolean updatePost(int id, Post p) {
        if(this.getPostById(id) == null) {
            return false;
        }
        p.setId(id);
        pr.save(p);
        return true;
    }
    
    public boolean deletePost(int id) {
        if(this.getPostById(id) == null) {
            return false;
        }
        pr.deleteById(id);
        return true;
    }
}
