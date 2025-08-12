package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
public class ItemController {

    @GetMapping("/items/")
    public List<String> readItems(@RequestParam String paramType) {
        if ("fruit".equals(paramType)) {
            return List.of("apple", "banana", "cherry", "date", "elderberry");
        }
        return List.of("BMW", "Mercedes", "Audi", "Volkswagen", "Tesla");
    }

    @GetMapping("/health")
    public Map<String, Object> health() {
        return Map.of(
                "status", "UP",
                "timestamp", LocalDateTime.now(),
                "message", "Testing automatic reload - mckenzie");
    }
}
