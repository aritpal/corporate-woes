package com.lifeishard.corporate_woes.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentRequestDTO {

    @NotBlank(message = "Comment content cannot be blank.")
    @Size(max = 2000, message = "Comment content cannot exceed 2000 characters.")
    private String content;
}
