import React from "react";
import { useLanguage } from "../contexts/LanguageContext"; // Import du contexte

const FooterButtons = ({ handleShowAllTasks, handleShowDoneTasks, handleShowTodoTasks, handleDeleteAllCheckedTask, activeButton, tasksLeftCounter }) => {
  const { translations, switchLanguage } = useLanguage(); // Récupère les traductions et la fonction de changement de langue

  return (
    <div className="footer-buttons">
      <button onClick={handleShowTodoTasks} className={activeButton === "todo" ? "active-button" : ""} title="Show tasks to do">
        {translations.showTodo}
      </button>
      <button onClick={handleShowDoneTasks} className={activeButton === "done" ? "active-button" : ""} title="Show completed tasks">
        {translations.showDone}
      </button>
      <button onClick={handleShowAllTasks} className={activeButton === "all" ? "active-button" : ""} title="Show all tasks">
        {translations.showAll}
      </button>
      <button onClick={handleDeleteAllCheckedTask} title="Delete all completed tasks">
        {translations.deleteAll}
      </button>
      <p className="tasksLeft">{tasksLeftCounter > 0 ? (tasksLeftCounter > 1 ? tasksLeftCounter + translations.tasksLeftPlural : tasksLeftCounter + translations.tasksLeft) : ""}</p>
    </div>
  );
};

export default FooterButtons;
