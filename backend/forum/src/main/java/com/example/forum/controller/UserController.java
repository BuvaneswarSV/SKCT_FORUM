package com.example.forum.controller;

// import com.example.forum.model.User;
// import com.example.forum.model.Post;
// import com.example.forum.service.UserService;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/users")
// public class UserController {

//     @Autowired
//     private UserService userService;

//     @PostMapping
//     public ResponseEntity<User> addUser(@RequestBody User user) {
//         User newUser = userService.create(user);
//         return new ResponseEntity<>(newUser, HttpStatus.CREATED);
//     }

//     @GetMapping
//     public ResponseEntity<List<User>> getAllUsers() {
//         List<User> users = userService.getAllDetails();
//         return new ResponseEntity<>(users, HttpStatus.OK);
//     }

//     @GetMapping("/{userId}")
//     public ResponseEntity<User> getUserById(@PathVariable Long userId) {
//         User user = userService.getUserById(userId);
//         if (user == null) {
//             return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//         }
//         return new ResponseEntity<>(user, HttpStatus.OK);
//     }

//     @PutMapping("/{userId}")
//     public ResponseEntity<User> updateUser(@PathVariable Long userId, @RequestBody User user) {
//         if (userService.updateDetails(userId, user)) {
//             return new ResponseEntity<>(user, HttpStatus.OK);
//         }
//         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//     }

//     @DeleteMapping("/{userId}")
//     public ResponseEntity<Boolean> deleteUser(@PathVariable Long userId) {
//         if (userService.deleteUser(userId)) {
//             return new ResponseEntity<>(true, HttpStatus.OK);
//         }
//         return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
//     }

//     @PostMapping("/{userId}/posts")
//     public ResponseEntity<Post> addPostToUser(@PathVariable Long userId, @RequestBody Post post) {
//         Post createdPost = userService.addPostToUser(userId, post);
//         if (createdPost == null) {
//             return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//         }
//         return new ResponseEntity<>(createdPost, HttpStatus.CREATED);
//     }
// }



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
// import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.example.forum.model.User;
import com.example.forum.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/auth")
public class UserController {
    @Autowired
    private UserService userService;

    // @Autowired
    // private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        if (userService.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Email is already taken!");
        }
        userService.registerUser(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<String> authenticateUser(@RequestBody User loginRequest) {
        User user = userService.findByEmail(loginRequest.getEmail());
        // User password = userService.findByEmail(loginRequest.getPassword());
        if (user != null) {
            return ResponseEntity.ok("Login successful!");
        } else {
            return ResponseEntity.badRequest().body("Invalid email or password");
        }
    }
}
