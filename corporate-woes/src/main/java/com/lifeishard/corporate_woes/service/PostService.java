package com.lifeishard.corporate_woes.service;

import com.lifeishard.corporate_woes.dto.PostRequestDTO;
import com.lifeishard.corporate_woes.dto.PostResponseDTO;
import com.lifeishard.corporate_woes.entity.Post;
import com.lifeishard.corporate_woes.repository.CommentRepository;
import com.lifeishard.corporate_woes.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Transactional
    public PostResponseDTO createPost(PostRequestDTO req) {
        Post post = new Post();
        post.setContent(req.getContent());
        return mapToPostResponseDTO(postRepository.save(post));
    }

    @Transactional(readOnly = true)
    public List<PostResponseDTO> getAllPosts() {
        return postRepository.findAllByOrderByCreatedAtDesc().stream().map(this::mapToPostResponseDTO).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public PostResponseDTO getPostById(Long id) {
        Post post = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
        return mapToPostResponseDTO(post);
    }

    @Transactional
    public PostResponseDTO upvotePost(Long id) {
        Post post = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
        post.setUpvotes(post.getUpvotes() + 1);
        return mapToPostResponseDTO(postRepository.save(post));
    }

    private PostResponseDTO mapToPostResponseDTO(Post post) {
        PostResponseDTO dto = new PostResponseDTO();
        dto.setId(post.getId());
        dto.setContent(post.getContent());
        dto.setCreatedAt(post.getCreatedAt());
        dto.setUpvotes(post.getUpvotes());
        dto.setCommentCount(commentRepository.countByPostId(post.getId())); //
        return dto;
    }
}
