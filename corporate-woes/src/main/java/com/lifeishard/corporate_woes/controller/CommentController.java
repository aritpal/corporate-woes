package com.lifeishard.corporate_woes.controller;

import com.lifeishard.corporate_woes.dto.CommentRequestDTO;
import com.lifeishard.corporate_woes.dto.CommentResponseDTO;
import com.lifeishard.corporate_woes.service.CommentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/posts/{postId}/comments")
@CrossOrigin(origins = "http://localhost:5173")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping
    public ResponseEntity<CommentResponseDTO> addComment(@PathVariable Long postId, @Valid @RequestBody CommentRequestDTO req) {
        CommentResponseDTO createdComment = commentService.addComment(postId, req);
        return new ResponseEntity<>(createdComment, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<CommentResponseDTO>> getComments(@PathVariable Long postId) {
        List<CommentResponseDTO> comments = commentService.getCommentsByPostId(postId);
        return ResponseEntity.ok(comments);
    }
}
