import React, { useState, useEffect } from "react";
import getInitialTasks from "./initialData";
import AddTask from "./AddTask";
import { v4 as uuidv4 } from "uuid";

const TodoList = () => {
  const [tasks, setTasks] = useState(getInitialTasks());
  const [selectedItem, setSelectedItem] = useState(null);
  const [filter, setFilter] = useState("all");

  // Hook useEffect qui est déclenché chaque fois que l'état 'tasks' change.
  // Il met à jour le 'localStorage' avec les tâches actuelles sous forme JSON.
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]); // Dépendance sur 'tasks', donc le code à l'intérieur de useEffect sera exécuté à chaque modification de 'tasks'

  //Marquer une tâche comme terminée
  const handleCheck = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task)));
  };

  //Ajouter une tâche
  const handleAddTask = (taskName) => {
    const newTask = { id: uuidv4(), name: taskName, done: false };
    setTasks([...tasks, newTask]);
  };

  //Supprimer une tâche (garde uniquement celles qui ne sont pas cochées)
  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  //Supprimer toutes les tâches qui sont cochées(garde celles qui ne sont pas cochées)
  const handleDeleteAllCheckedTask = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.done === false));
  };

  //Gestion des filtres
  const handleShowAllTasks = () => setFilter("all");
  const handleShowDoneTasks = () => setFilter("done");

  //Filtrer les tâches à afficher
  const filteredTasks = tasks.filter((task) => (filter === "all" ? true : task.done));

  return (
    <>
      <div class="container">
        <header>
          <h1>My Todo App</h1>
        </header>

        <main>
          <AddTask onAddTask={handleAddTask} />
          <hr></hr>
          <h2>To do</h2>
          {filteredTasks.length === 0 ? (
            <p className="no-tasks">No task found.</p>
          ) : (
            <ul>
              {filteredTasks.map((task) => (
                <li key={task.id}>
                  <input type="checkbox" id={task.id} checked={task.done} onChange={() => handleCheck(task.id)} />

                  <label htmlFor={task.id} style={{ textDecoration: task.done ? "line-through" : "none" }}>
                    {task.name}
                  </label>
                  {task.done && <button onClick={() => handleDeleteTask(task.id)}>❌</button>}
                </li>
              ))}
            </ul>
          )}
          <button onClick={handleShowAllTasks}>Show all tasks</button>&nbsp;
          <button onClick={handleShowDoneTasks}>Show done tasks</button>&nbsp;
          <button onClick={handleDeleteAllCheckedTask}>Delete all checked</button>
        </main>
      </div>
    </>
  );
};

export default TodoList;
