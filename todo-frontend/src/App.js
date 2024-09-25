import React from 'react';
import './App.css';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';

function App() {
    return (
        <div className="App">
            <h1>Gestion des Tâches</h1>
            <TaskList />
            <AddTask onTaskAdded={(newTask) => { /* Passer cette fonction pour gérer les nouvelles tâches */ }} />
        </div>
    );
}

export default App;
