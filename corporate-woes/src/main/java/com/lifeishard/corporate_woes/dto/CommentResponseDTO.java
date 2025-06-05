package com.lifeishard.corporate_woes.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CommentResponseDTO {
    private Long id;
    private Long postId;
    private String commenterName;
    private String content;
    private LocalDateTime createdAt;
}
