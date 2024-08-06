package com.example.demo.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.model.Post;
import com.example.demo.service.PostService;

@RestController
@RequestMapping("/post")
public class PostController {
    @Autowired
    private PostService postService;

    @GetMapping
    public List<Post> getAllPost() {
        return postService.getAllPosts();
    }

    @GetMapping("/{postid}")
    public Post getPostById(@PathVariable Long postid) {
        return postService.getPostById(postid);
    }

    @GetMapping("/thread/{threadid}")
    public List<Post> getPostsByThreadId(@PathVariable Long threadid) {
        return postService.getPostsByThreadId(threadid);
    }

    @PostMapping
    public Post createPost(@RequestBody Post post) {
        return postService.savePost(post);
    }

    @PutMapping("/{postid}")
    public Post updatePost(@PathVariable Long postid, @RequestBody Post post) {
        post.setPostid(postid);
        return postService.savePost(post);
    }

    @DeleteMapping("/{postid}")
    public void deletePost(@PathVariable Long postid) {
        postService.deletePost(postid);
    }
}
