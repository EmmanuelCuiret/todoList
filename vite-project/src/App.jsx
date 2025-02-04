import FormAddTask from "./components/FormAddTask";
import Todo from "./components/Todo";
import FooterButtons from "./components/FooterButtons";
import useTasks from "./hooks/useTasks";

const App = () => {
  // Utilisation du hook pour gérer les tâches
  const { tasks, filteredTasks, handleAddTask, handleCheck, handleDeleteTask, handleCheckAll, handleEditTask, handleShowAllTasks, handleShowDoneTasks, handleDeleteAllCheckedTask, activeButton } = useTasks();

  return (
    <>
      <div className="container">
        <header>
          <h1>My Todo App</h1>
        </header>

        <main>
          {/*AJOUT D'UNE NOUVELLE TACHE*/}
          <FormAddTask onAddTask={handleAddTask} />
          <hr />
          {/*AFFICHAGE DES TACHES*/}
          <Todo filteredTasks={filteredTasks} handleCheck={handleCheck} handleDeleteTask={handleDeleteTask} handleCheckAll={handleCheckAll} handleEditTask={handleEditTask} />
          {/*AFFICHAGE DES BOUTONS DE PIED DE PAGE}*/}
          <FooterButtons handleShowAllTasks={handleShowAllTasks} handleShowDoneTasks={handleShowDoneTasks} handleDeleteAllCheckedTask={handleDeleteAllCheckedTask} activeButton={activeButton} />
        </main>
      </div>
    </>
  );
};

export default App;
