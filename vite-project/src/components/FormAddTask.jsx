import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext"; // Import du contexte

const AddTask = ({ onAddTask }) => {
  //onAddTask permet d'ajouter la nouvelle tâche à la liste des tâches
  //Utilisation de useState pour stocker le nom de la tâche
  const [taskName, setTaskName] = useState("");

  const { translations, switchLanguage } = useLanguage(); // Récupère les traductions et la fonction de changement de langue

  //Fonction pour gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche la soumission par défaut du formulaire
    if (taskName.trim()) {
      // Vérifie que la tâche n'est pas vide
      onAddTask(taskName); // Appelle la fonction onAddTask (transmise par le parent) pour ajouter la tâche
      setTaskName(""); // Réinitialise le champ après l'ajout de la tâche
    } else {
      alert(translations.taskRequired); // Alerte si la tâche est vide
      autoFocus;
    }
  };

  //Fonction pour mettre à jour l'état de la tâche lorsqu'on tape dans le champ
  const handleChange = (e) => {
    setTaskName(e.target.value);
  };

  return (
    <section>
      <h2>{translations.newTask}</h2>
      <div>
        <form id="formTask" onSubmit={handleSubmit}>
          <div>
            <input type="text" placeholder={translations.taskName} name="taskName" id="taskName" value={taskName} onChange={handleChange} />
            <button className="buttonCreate" type="submit">
              {translations.createTask}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddTask;
