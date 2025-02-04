import React, { useState } from "react";

const AddTask = ({ onAddTask }) => {
  //onAddTask permet d'ajouter la nouvelle tâche à la liste des tâches
  //Utilisation de useState pour stocker le nom de la tâche
  const [taskName, setTaskName] = useState("");

  //Fonction pour gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche la soumission par défaut du formulaire
    if (taskName.trim()) {
      // Vérifie que la tâche n'est pas vide
      onAddTask(taskName); // Appelle la fonction onAddTask (transmise par le parent) pour ajouter la tâche
      setTaskName(""); // Réinitialise le champ après l'ajout de la tâche
    } else {
      alert("Veuillez entrer un nom pour la tâche."); // Alerte si la tâche est vide
    }
  };

  //Fonction pour mettre à jour l'état de la tâche lorsqu'on tape dans le champ
  const handleChange = (e) => {
    setTaskName(e.target.value);
  };

  return (
    <section>
      <h2>New task</h2>
      <div>
        <form id="formTask" onSubmit={handleSubmit}>
          <div>
            <input type="text" placeholder="Task name" name="taskName" id="taskName" value={taskName} onChange={handleChange}  />
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddTask;
