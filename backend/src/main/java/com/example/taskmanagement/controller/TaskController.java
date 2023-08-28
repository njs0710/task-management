package com.example.taskmanagement.controller;

import com.example.taskmanagement.model.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    public TaskController() {}

    @GetMapping("/404")
    public ResponseEntity<Task> return404() {
        return ResponseEntity.notFound().build();
    }
   
}