package com.example.forum.model;
// import com.fasterxml.jackson.annotation.JsonBackReference;
// import com.fasterxml.jackson.annotation.JsonManagedReference;
// import jakarta.persistence.*;
// import lombok.AllArgsConstructor;
// import lombok.Getter;
// import lombok.NoArgsConstructor;
// import lombok.Setter;

// import java.util.Set;

// @AllArgsConstructor
// @NoArgsConstructor
// @Getter
// @Setter
// @Entity
// public class Thread {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     private String title;

//     private String createdAt;

//     @ManyToOne
//     @JoinColumn(name = "user_id")
//     @JsonBackReference
//     private User user; // One thread is created by one user

//     @OneToMany(mappedBy = "thread", cascade = CascadeType.ALL, orphanRemoval = true)
//     @JsonManagedReference
//     private Set<Post> posts; // One thread can have many posts
// }



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;


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
}