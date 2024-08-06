package com.example.demo.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.model.Post;
import com.example.demo.repository.PostRepository;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post getPostById(Long postid) {
        return postRepository.findById(postid).orElse(null);
    }

    public List<Post> getPostsByThreadId(Long threadid) {
        return postRepository.findByThreadThreadid(threadid);
    }

    public Post savePost(Post post) {
        return postRepository.save(post);
    }

    public void deletePost(Long postid) {
        postRepository.deleteById(postid);
    }
}
