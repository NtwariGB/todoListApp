package com.beni.toDoList.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.beni.toDoList.model.Task;
import com.beni.toDoList.repository.TaskRepository;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task createTask(Task task) {
        // Définir la phase par défaut si elle n'est pas spécifiée
        if (task.getPhase() == null || task.getPhase().isEmpty()) {
            task.setPhase("To Do");
        }
        return taskRepository.save(task);
    }

    public Task updateTask(Long id, Task updatedTask) {
        return taskRepository.findById(id)
            .map(task -> {
                task.setTitle(updatedTask.getTitle());
                task.setDescription(updatedTask.getDescription());
                task.setCompleted(updatedTask.isCompleted());
                task.setPhase(updatedTask.getPhase());
                return taskRepository.save(task);
            })
            .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}
