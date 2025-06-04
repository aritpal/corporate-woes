package com.lifeishard.corporate_woes.repository;

import com.lifeishard.corporate_woes.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByPostIdOrderByCreatedAtAsc(Long postId);

    int countByPostId(Long postId);
}
