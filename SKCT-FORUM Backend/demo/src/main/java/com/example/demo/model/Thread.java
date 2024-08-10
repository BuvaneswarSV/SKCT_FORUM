package com.example.demo.model;

// import jakarta.persistence.Entity;
// import jakarta.persistence.Id;
// import jakarta.persistence.OneToMany;
// import jakarta.persistence.CascadeType;
// import java.util.List;

// @Entity
// public class Thread {
//     @Id
//     private Long threadid;
//     private String author;
//     private String question;
//     private String date;

//     @OneToMany(mappedBy = "thread", cascade = CascadeType.ALL)
//     private List<Post> posts;

//     public Long getThreadid() {
//         return threadid;
//     }

//     public void setThreadid(Long threadid) {
//         this.threadid = threadid;
//     }

//     public String getAuthor() {
//         return author;
//     }

//     public void setAuthor(String author) {
//         this.author = author;
//     }

//     public String getQuestion() {
//         return question;
//     }

//     public void setQuestion(String question) {
//         this.question = question;
//     }

//     public String getDate() {
//         return date;
//     }

//     public void setDate(String date) {
//         this.date = date;
//     }

//     public List<Post> getPosts() {
//         return posts;
//     }

//     public void setPosts(List<Post> posts) {
//         this.posts = posts;
//     }
// }


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
// import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "try_thread")
public class Thread {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String content;
    private String user;

    private int likes;

    

    // @OneToMany(mappedBy = "thread", cascade = CascadeType.ALL, orphanRemoval = true)
    // private List<Comment> comments;

    // @OneToMany(mappedBy = "thread", cascade = CascadeType.ALL, orphanRemoval = true)
    // private List<File> files;
}
