package com.lifeishard.corporate_woes.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostRequestDTO {

    @NotBlank(message = "Post content cannot be blank.")
    @Size(max = 5000, message = "Post content cannot exceed 5000 characters.")
    private String content;
}