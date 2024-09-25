package com.beni.toDoList.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.beni.toDoList.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
