import React, { useState, useCallback } from "react";
import { FaRegTrashCan, FaPencil, FaCheck, FaArrowRotateLeft } from "react-icons/fa6";
import { useLanguage } from "../contexts/LanguageContext"; // Import du contexte

const Todo = ({ filteredTasks, handleCheck, handleDeleteTask, handleCheckAll, handleEditTask }) => {
  const [editingTask, setEditingTask] = useState(null);
  const [originalTaskName, setOriginalTaskName] = useState("");
  const { translations, switchLanguage } = useLanguage(); // Récupère les traductions et la fonction de changement de langue

  //Déclencher l'édition
  const handleEdit = useCallback((task) => {
    setEditingTask({ id: task.id, name: task.name });
    setOriginalTaskName(task.name); //Sauvegarde le nom original
  }, []);

  //Sauver le nouveau nom
  const handleSave = useCallback(() => {
    if (editingTask?.name.trim()) {
      handleEditTask(editingTask.id, editingTask.name);
    }
    setEditingTask(null);
  }, [editingTask, handleEditTask]);

  //Annuler la modification du nom et restaure le nom original
  const handleCancelEdit = useCallback(() => {
    if (editingTask) {
      setEditingTask({ id: editingTask.id, name: originalTaskName });
    }
    setEditingTask(null);
  }, [editingTask, originalTaskName]);

  return (
    <>
      {filteredTasks.length === 0 ? (
        <p className="no-tasks">{translations.noTaskFound}</p>
      ) : (
        <ul>
          {/*CHECKBOX "TOUT SELECTIONNER"*/}
          {filteredTasks.length > 0 && (
            <li className="liCheckAll">
              <label htmlFor="checkAll" className="labelCheckAll">
                {translations.checkAll}
              </label>
              <input type="checkbox" style={{ display: !editingTask ? "inline-block" : "none" }} className="inputCheckAll" onChange={handleCheckAll} checked={filteredTasks.every((task) => task.done)}></input>
            </li>
          )}

          {/*LIBELLE DE LA TACHE*/}
          {filteredTasks.map((task) => (
            <li key={task.id}>
              <input type="checkbox" style={{ display: !editingTask ? "inline-block" : "none" }} id={task.id} checked={task.done} onChange={() => handleCheck(task.id)} />
              {editingTask?.id === task.id ? (
                // MODE EDITION
                <span>
                  <input
                    type="text"
                    value={editingTask.name}
                    onChange={(e) => setEditingTask({ ...editingTask, name: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSave();
                      if (e.key === "Escape") handleCancelEdit();
                    }}
                    autoFocus // Met le focus directement dans l'input
                    className="task-input"
                    //Partie pour empêcher des comportements d'autocomplete sur smartphone
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                  />
                </span>
              ) : (
                // MODE NORMAL*/}
                <span style={{ textDecoration: task.done ? "line-through" : "none" }}>{task.name}</span>
              )}

              <div className="buttonAction">
                {/*AFFICHAGE DU BOUTON SAUVER*/}
                <button className="buttonSave" style={{ display: editingTask?.id === task.id && !task.done ? "inline-block" : "none" }} onClick={handleSave} aria-label="Save">
                  <FaCheck />
                </button>
                {/*AFFICHAGE DU BOUTON CANCEL*/}
                <button className="buttonCancel" style={{ display: editingTask?.id === task.id && !task.done ? "inline-block" : "none" }} onClick={handleCancelEdit} aria-label="Cancel">
                  <FaArrowRotateLeft />
                </button>

                {/*AFFICHAGE DU BOUTON EDITER*/}
                <button className="buttonEdit" style={{ display: !task.done && !editingTask ? "inline-block" : "none" }} onClick={() => handleEdit(task)} aria-label="Modify the task">
                  <FaPencil />
                </button>

                {/*AFFICHAGE DU BOUTON SUPPRIMER*/}
                <button className="buttonDelete" style={{ display: task.done ? "inline-block" : "none" }} onClick={() => handleDeleteTask(task.id)} aria-label="Delete the task">
                  <FaRegTrashCan />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Todo;
