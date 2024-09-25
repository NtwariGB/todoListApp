import React, { useState } from 'react';
import { createTask } from '../services/taskService.js';

const AddTask = ({ refreshTasks }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createTask({ title, description, completed: false });
            setTitle('');
            setDescription('');
            if (refreshTasks) refreshTasks(); // Rafraîchir la liste des tâches si une fonction est fournie
        } catch (error) {
            console.error('Erreur lors de la création de la tâche:', error);
        }
    };

    return (
        <div className="add-task">
            <h2>Ajouter une Tâche</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Titre:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Description:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default AddTask;
