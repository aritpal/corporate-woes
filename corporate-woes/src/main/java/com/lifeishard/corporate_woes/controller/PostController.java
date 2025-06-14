package com.lifeishard.corporate_woes.controller;

import com.lifeishard.corporate_woes.dto.PostRequestDTO;
import com.lifeishard.corporate_woes.dto.PostResponseDTO;
import com.lifeishard.corporate_woes.service.PostService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/posts")
@CrossOrigin(origins = "http://localhost:5173")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping
    public ResponseEntity<PostResponseDTO> createPost(@Valid @RequestBody PostRequestDTO req) {
        PostResponseDTO createdPost = postService.createPost(req);
        return new ResponseEntity<>(createdPost, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<PostResponseDTO>> getAllPosts() {
        List<PostResponseDTO> posts = postService.getAllPosts();
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostResponseDTO> getPostById(@PathVariable Long id) {
        PostResponseDTO post = postService.getPostById(id);
        return ResponseEntity.ok(post);
    }

    @PostMapping("/{id}/upvote") //
    public ResponseEntity<PostResponseDTO> upvotePost(@PathVariable Long id) { //
        PostResponseDTO upvotedPost = postService.upvotePost(id);
        return ResponseEntity.ok(upvotedPost); //
    }
}
