import React, { useState, useCallback } from "react";

const Todo = ({ filteredTasks, handleCheck, handleDeleteTask, handleCheckAll, handleEditTask }) => {
  const [editingTask, setEditingTask] = useState(null);
  const [originalTaskName, setOriginalTaskName] = useState("");

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
      <h2>To do</h2>

      {filteredTasks.length === 0 ? (
        <p className="no-tasks">No task found.</p>
      ) : (
        <ul>
          {/*CHECKBOX "TOUT SELECTIONNER"*/}
          <li className="liCheckAll">
            <label htmlFor="checkAll" className="labelCheckAll">
              <strong>Check all</strong>
            </label>
            <input type="checkbox" className="inputCheckAll" onChange={handleCheckAll} checked={filteredTasks.every((task) => task.done)}></input>
          </li>

          {/*LIBELLE DE LA TACHE*/}
          {filteredTasks.map((task) => (
            <li key={task.id}>
              <input type="checkbox" id={task.id} checked={task.done} onChange={() => handleCheck(task.id)} />
              {editingTask?.id === task.id ? (
                // MODE EDITION
                <span>
                  <input
                    type="text"
                    value={editingTask.name}
                    onChange={(e) => setEditingTask({ ...editingTask, name: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key == "Enter") handleSave();
                      if (e.key === "Escape") handleCancelEdit();
                    }}
                    autoFocus // Met le focus directement dans l'input
                    className="task-input"
                    //Partie pour empêcher des comportements d'autocomplete sur smartphone
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                  />
                  <button onClick={handleCancelEdit} aria-label="Cancel">
                    Cancel
                  </button>
                </span>
              ) : (
                // MODE NORMAL

                <span style={{ textDecoration: task.done ? "line-through" : "none" }}>{task.name}</span>
              )}

              {editingTask?.id === task.id && (
                <button onClick={handleSave} aria-label="Save">
                  Save
                </button>
              )}

              {!task.done && !editingTask && (
                //AFFICHAGE DU BOUTON EDITER
                <button className="buttonEdit" onClick={() => handleEdit(task)} aria-label="Modify the task">
                  Edit
                </button>
              )}

              {task.done && (
                //AFFICHAGE DU BOUTON SUPPRIMER
                <button className="buttonDelete" onClick={() => handleDeleteTask(task.id)} aria-label="Delete the task">
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Todo;
