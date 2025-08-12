package com.example.demo.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ItemController.class)
class ItemControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void shouldReturnFruitsWhenParamTypeIsFruit() throws Exception {
        mockMvc.perform(get("/items/").param("paramType", "fruit"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0]").value("apple"))
                .andExpect(jsonPath("$[1]").value("banana"))
                .andExpect(jsonPath("$[2]").value("cherry"))
                .andExpect(jsonPath("$[3]").value("date"))
                .andExpect(jsonPath("$[4]").value("elderberry"));
    }

    @Test
    void shouldReturnCarsWhenParamTypeIsNotFruit() throws Exception {
        mockMvc.perform(get("/items/").param("paramType", "cars"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0]").value("BMW"))
                .andExpect(jsonPath("$[1]").value("Mercedes"))
                .andExpect(jsonPath("$[2]").value("Audi"))
                .andExpect(jsonPath("$[3]").value("Volkswagen"))
                .andExpect(jsonPath("$[4]").value("Tesla"));
    }
}