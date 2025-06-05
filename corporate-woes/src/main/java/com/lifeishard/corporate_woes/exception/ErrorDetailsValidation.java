package com.lifeishard.corporate_woes.exception;

import java.time.LocalDateTime;
import java.util.Map;

public record ErrorDetailsValidation(LocalDateTime timestamp, String message, String details, Map<String, String> validationErrors) {
}
