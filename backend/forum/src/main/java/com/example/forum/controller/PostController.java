// package com.example.forum.controller;

// import com.example.forum.model.Post;
// import com.example.forum.model.Thread;
// import com.example.forum.model.User;
// import com.example.forum.service.PostService;
// import com.example.forum.service.ThreadService;
// import com.example.forum.service.UserService;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/posts")
// public class PostController {

//     @Autowired
//     private PostService postService;

//     @Autowired
//     private ThreadService threadService;

//     @Autowired
//     private UserService userService;

//     @PostMapping
// public ResponseEntity<Post> createPost(@RequestBody Post post) {
//     User user = userService.getUserById(post.getUser().getId()); // Get the user from the post's user object
//     Thread thread = threadService.getThreadById(post.getThread().getId()); // Get the thread from the post's thread object
//     if (user == null || thread == null) {
//         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//     }
//     post.setUser(user); // Set the user reference
//     post.setThread(thread); // Set the thread reference
//     Post newPost = postService.createPost(post);
//     return new ResponseEntity<>(newPost, HttpStatus.CREATED);
// }


//     @GetMapping
//     public ResponseEntity<List<Post>> getAllPosts() {
//         List<Post> posts = postService.getAllPosts();
//         return new ResponseEntity<>(posts, HttpStatus.OK);
//     }

//     @GetMapping("/{id}")
//     public ResponseEntity<Post> getPostById(@PathVariable Long id) {
//         Post post = postService.getPostById(id);
//         if (post == null) {
//             return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//         }
//         return new ResponseEntity<>(post, HttpStatus.OK);
//     }

//     @PutMapping("/{id}")
//     public ResponseEntity<Post> updatePost(@PathVariable Long id, @RequestBody Post post) {
//         Post updatedPost = postService.updatePost(id, post);
//         if (updatedPost == null) {
//             return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//         }
//         return new ResponseEntity<>(updatedPost, HttpStatus.OK);
//     }

//     @DeleteMapping("/{id}")
//     public ResponseEntity<Boolean> deletePost(@PathVariable Long id) {
//         boolean isDeleted = postService.deletePost(id);
//         if (isDeleted) {
//             return new ResponseEntity<>(true, HttpStatus.OK);
//         }
//         return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
//     }
// }
