import React from 'react';
import './App.css'; // Assurez-vous que le CSS est importé
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';

function App() {
    return (
        <div className="App">
            <h1>Gestion des Tâches</h1>
            <AddTask />
            <TaskList />
        </div>
    );
}

export default App;
