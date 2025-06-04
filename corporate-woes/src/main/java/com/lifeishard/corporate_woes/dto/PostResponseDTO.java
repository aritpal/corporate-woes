package com.lifeishard.corporate_woes.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class PostResponseDTO {
    private Long id;
    private String content;
    private LocalDateTime createdAt;
    private Integer upvotes;
    private Integer commentCount;
}
