import React from "react";

const FooterButtons = ({ handleShowAllTasks, handleShowDoneTasks, handleDeleteAllCheckedTask, activeButton }) => {
  console.log(activeButton);
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
    </div>
  );
};

export default FooterButtons;
