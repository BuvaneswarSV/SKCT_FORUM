// package com.example.forum.service;

// import com.example.forum.model.Post;
// import com.example.forum.model.Thread;
// import com.example.forum.model.User;
// import com.example.forum.repository.PostRepo;
// import com.example.forum.repository.ThreadRepo;
// import com.example.forum.repository.UserRepo;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import java.util.List;

// @Service
// public class PostService {

//     @Autowired
//     private PostRepo postRepo;

//     @Autowired
//     private ThreadRepo threadRepo;

//     @Autowired
//     private UserRepo userRepo;

//     public Post createPost(Post post) {
//         User user = userRepo.findById(post.getUser().getId()).orElse(null);
//         Thread thread = threadRepo.findById(post.getThread().getId()).orElse(null);
//         if (user == null || thread == null) {
//             return null; // User or thread not found
//         }
//         post.setUser(user); // Correctly set the user reference
//         post.setThread(thread); // Correctly set the thread reference
//         return postRepo.save(post);
//     }

//     public List<Post> getAllPosts() {
//         return postRepo.findAll();
//     }

//     public Post getPostById(Long id) {
//         return postRepo.findById(id).orElse(null);
//     }

//     public Post updatePost(Long id, Post post) {
//         if (!postRepo.existsById(id)) {
//             return null;
//         }
//         post.setId(id);
//         return postRepo.save(post);
//     }

//     public boolean deletePost(Long id) {
//         if (!postRepo.existsById(id)) {
//             return false;
//         }
//         postRepo.deleteById(id);
//         return true;
//     }
// }
