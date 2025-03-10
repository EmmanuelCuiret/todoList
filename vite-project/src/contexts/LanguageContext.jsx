import React, { createContext, useState, useContext } from "react";

//Définition des textes pour chaque langue
const translations = {
  en: {
    appTitle: "Reminder",
    checkAll: "Check all",
    createTask: "Create",
    deleteAll: "Delete all",
    newTask: "New task",
    noTaskFound: "No task found",
    showAll: "All",
    showDone: "Done",
    showTodo: "To do",
    taskName: "Task name",
    taskRequired: "Let's type a name for the task",
    tasksLeft: " task left",
    tasksLeftPlural: " tasks left",
  },
  fr: {
    appTitle: "Pense-bête",
    checkAll: "Cocher tout",
    createTask: "Créer",
    deleteAll: "Tout supprimer",
    newTask: "Nouvelle tâche",
    noTaskFound: "Aucune tâche trouvée",
    showAll: "Toutes",
    showDone: "Terminées",
    showTodo: "A faire",
    taskName: "Nom de la tâche",
    taskRequired: "Veuillez saisir un nom pour la tâche",
    tasksLeft: " tâche restante",
    tasksLeftPlural: " tâches restantes",
  },
};

// Création du contexte
const LanguageContext = createContext();

// Hook pour utiliser la langue facilement
export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("fr"); // Langue par défaut

  // Fonction pour changer de langue
  const switchLanguage = (lang) => {
    setLanguage(lang);
  };

  return <LanguageContext.Provider value={{ language, switchLanguage, translations: translations[language] }}>{children}</LanguageContext.Provider>;
};
