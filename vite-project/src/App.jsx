import React from "react";
import FormAddTask from "./components/FormAddTask";
import Todo from "./components/Todo";
import FooterButtons from "./components/FooterButtons";
import useTasks from "./hooks/useTasks";
import { useLanguage } from "./contexts/LanguageContext";

const App = () => {
  // Utilisation du hook pour gérer les tâches
  const { tasks, filteredTasks, handleAddTask, handleCheck, handleDeleteTask, handleCheckAll, handleEditTask, handleShowAllTasks, handleShowDoneTasks, handleShowTodoTasks, handleDeleteAllCheckedTask, activeButton, tasksLeftCounter } = useTasks();
  const { language, translations, switchLanguage } = useLanguage(); // Récupère les traductions et la fonction de changement de langue

  return (
    <>
      <div className="container">
        <header>
          <h1>
            {translations.appTitle}
            {/* Boutons pour changer la langue */}
            <button onClick={() => switchLanguage("en")} className={language === "en" ? "activeLanguage" : "nonActiveLanguage"}>
              <img src="../flag_gb.png" alt="GB"></img></button>
            <button onClick={() => switchLanguage("fr")} className={language === "fr" ? "activeLanguage" : "nonActiveLanguage"}>
            <img src="../flag_fr.png" alt="GB"></img></button>
          </h1>
        </header>

        <main>
          {/*AJOUT D'UNE NOUVELLE TACHE*/}
          <FormAddTask onAddTask={handleAddTask} />
          <hr />
          {/*AFFICHAGE DES TACHES*/}
          <Todo filteredTasks={filteredTasks} handleCheck={handleCheck} handleDeleteTask={handleDeleteTask} handleCheckAll={handleCheckAll} handleEditTask={handleEditTask} />
          {/*AFFICHAGE DES BOUTONS DE PIED DE PAGE}*/}
          <FooterButtons handleShowAllTasks={handleShowAllTasks} handleShowDoneTasks={handleShowDoneTasks} handleShowTodoTasks={handleShowTodoTasks} handleDeleteAllCheckedTask={handleDeleteAllCheckedTask} activeButton={activeButton} tasksLeftCounter={tasksLeftCounter} />
        </main>
      </div>
    </>
  );
};

export default App;
