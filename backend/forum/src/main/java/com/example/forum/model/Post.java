// package com.example.forum.model;
// import com.fasterxml.jackson.annotation.JsonBackReference;
// import jakarta.persistence.*;
// import lombok.AllArgsConstructor;
// import lombok.Getter;
// import lombok.NoArgsConstructor;
// import lombok.Setter;

// @AllArgsConstructor
// @NoArgsConstructor
// @Getter
// @Setter
// @Entity
// public class Post {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     private String content;

//     @ManyToOne
//     @JoinColumn(name = "thread_id")
//     @JsonBackReference
//     private Thread thread; // One post belongs to one thread

//     @ManyToOne
//     @JoinColumn(name = "user_id")
//     @JsonBackReference
//     private User user; // One post is authored by one user
// }
