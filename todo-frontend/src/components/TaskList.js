import React, { useEffect, useState } from 'react';
import { getTasks } from '../services/taskService.js';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const response = await getTasks();
            setTasks(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des tâches:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="task-list">
            <h2>Liste des Tâches</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        {task.title} - {task.completed ? 'Complétée' : 'Non Complétée'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
