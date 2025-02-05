import React from "react";

const FooterButtons = ({ handleShowAllTasks, handleShowDoneTasks, handleDeleteAllCheckedTask, activeButton, tasksLeftCounter }) => {
  return (
    <div className="footer-buttons">
      <button onClick={handleShowAllTasks} className={activeButton === "all" ? "active-button" : ""}>
        Show all
      </button>
      &nbsp;
      <button onClick={handleShowDoneTasks} className={activeButton === "done" ? "active-button" : ""}>
        Show done
      </button>
      &nbsp;
      <button onClick={handleDeleteAllCheckedTask}>Delete all</button>
      <p>{tasksLeftCounter > 1 ? tasksLeftCounter + " tasks left" : tasksLeftCounter + " task left"}</p>
    </div>
  );
};

export default FooterButtons;
