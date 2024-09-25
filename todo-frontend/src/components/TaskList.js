import React, { useEffect, useState } from 'react';
import { getTasks, updateTask } from '../services/taskService.js';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './TaskList.css';  // Assurez-vous que le chemin est correct

const phases = ['To Do', 'In Progress', 'Done'];

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await getTasks();
                setTasks(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des tâches:', error);
            }
        };

        fetchTasks();
    }, []);

    const onDragEnd = async (result) => {
        const { source, destination } = result;

        if (!destination) return;

        const updatedTasks = Array.from(tasks);
        const [movedTask] = updatedTasks.splice(source.index, 1);
        movedTask.phase = destination.droppableId;
        updatedTasks.splice(destination.index, 0, movedTask);

        setTasks(updatedTasks);

        try {
            await updateTask(movedTask.id, movedTask);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la tâche:', error);
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {phases.map((phase) => (
                <Droppable key={phase} droppableId={phase}>
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="column"
                        >
                            <h2>{phase}</h2>
                            <ul>
                                {tasks
                                    .filter(task => task.phase === phase)
                                    .map((task, index) => (
                                        <Draggable
                                            key={task.id}
                                            draggableId={task.id.toString()}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <li
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="task"
                                                >
                                                    {task.title} - {task.completed ? 'Complétée' : 'Non Complétée'}
                                                </li>
                                            )}
                                        </Draggable>
                                    ))}
                                {provided.placeholder}
                            </ul>
                        </div>
                    )}
                </Droppable>
            ))}
        </DragDropContext>
    );
};

export default TaskList;
