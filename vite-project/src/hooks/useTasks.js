import { useState, useEffect } from "react";
import getInitialTasks from "../initialData";
import { v4 as uuidv4 } from "uuid";

const LSKEY = "MyTodoList";

const useTasks = () => {

  const [tasks, setTasks] = useState(getInitialTasks());
  const [filter, setFilter] = useState("todo");
  const [activeButton, setActiveButton] = useState("todo");

  // Hook useEffect qui est déclenché chaque fois que l'état 'tasks' change.
  // Il met à jour le 'localStorage' avec les tâches actuelles sous forme JSON.
  useEffect(() => {
    localStorage.setItem(LSKEY + ".tasks", JSON.stringify(tasks));
  }, [tasks]); // Dépendance sur 'tasks', donc le code à l'intérieur de useEffect sera exécuté à chaque modification de 'tasks'

  //Marquer une tâche comme terminée
  const handleCheck = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task)));
  };

  //Cocher toutes les tâches
  const handleCheckAll = () => {
    const allChecked = tasks.every((task) => task.done);
    setTasks(tasks.map((task) => ({ ...task, done: !allChecked })));
  };

  //Ajouter une tâche
  const handleAddTask = (taskName) => {
    if (!taskName.trim()) return; // Empêche l'ajout d'une tâche vide
    const newTask = { id: uuidv4(), name: taskName, done: false };
    setTasks([...tasks, newTask]);
  };

  //Supprimer une tâche (garde uniquement celles qui ne sont pas cochées)
  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  //Supprimer toutes les tâches qui sont cochées(garde celles qui ne sont pas cochées)
  const handleDeleteAllCheckedTask = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.done));
  };

  //Edite le nom d'une tâche
  const handleEditTask = (id, newName) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, name: newName } : task
      )
    );
  };

  //Gestion des filtres
  const handleShowAllTasks = () => {
    setFilter("all");
    setActiveButton("all");
  };
  const handleShowDoneTasks = () => {
    setFilter("done");
    setActiveButton("done");
  };
  const handleShowTodoTasks = () => {
    setFilter("todo");
    setActiveButton("todo");
  };

  //Tâches filtrées
  const filteredTasks = tasks.filter((task) => {
    if (filter === "todo") return !task.done; // Tâches à faire
    if (filter === "done") return task.done;  // Tâches terminées
    return true; // Toutes les tâches
  });

  //Compteur de tâches restantes à réaliser
  const tasksLeftCounter = tasks.filter((task) => !task.done).length;

  return {
    activeButton,
    filteredTasks,
    handleAddTask,
    handleCheck,
    handleCheckAll,
    handleDeleteTask,
    handleDeleteAllCheckedTask,
    handleEditTask,
    handleShowAllTasks,
    handleShowDoneTasks,
    handleShowTodoTasks,
    tasksLeftCounter,
    tasks,
  };
};

export default useTasks;
