package com.lifeishard.corporate_woes.service;

import com.lifeishard.corporate_woes.dto.CommentRequestDTO;
import com.lifeishard.corporate_woes.dto.CommentResponseDTO;
import com.lifeishard.corporate_woes.entity.Comment;
import com.lifeishard.corporate_woes.entity.Post;
import com.lifeishard.corporate_woes.exception.ResourceNotFoundException; //
import com.lifeishard.corporate_woes.repository.CommentRepository;
import com.lifeishard.corporate_woes.repository.PostRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Validated
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @Transactional
    public CommentResponseDTO addComment(Long postId, @Valid CommentRequestDTO req) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + postId + " when trying to add comment.")); //
        Comment comment = new Comment();
        comment.setPost(post);
        comment.setContent(req.getContent());
        Comment savedComment = commentRepository.save(comment);
        return mapToCommentResponseDTO(savedComment);
    }

    @Transactional(readOnly = true)
    public List<CommentResponseDTO> getCommentsByPostId(Long postId) {
        if (!postRepository.existsById(postId)) {
            throw new ResourceNotFoundException("Post not found with id: " + postId + " when trying to fetch comments."); //
        }
        return commentRepository.findByPostIdOrderByCreatedAtAsc(postId).stream()
                .map(this::mapToCommentResponseDTO)
                .collect(Collectors.toList());
    }

    private CommentResponseDTO mapToCommentResponseDTO(Comment comment) {
        CommentResponseDTO dto = new CommentResponseDTO();
        dto.setId(comment.getId());
        if (comment.getPost() != null) {
            dto.setPostId(comment.getPost().getId());
        }
        dto.setCommenterName("Anonymous");
        dto.setContent(comment.getContent());
        dto.setCreatedAt(comment.getCreatedAt());
        return dto;
    }
}
