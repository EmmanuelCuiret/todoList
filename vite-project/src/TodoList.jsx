const TodoList = () => {
  return (
    <>
      <header>
        <h1>My Todo App</h1>
      </header>

      <main>
        <form>
          <input type="text" placeholder="Type a new todo" />
          <button type="submit">Add Todo</button>
        </form>
        <hr />
        <h2>Todos</h2>
        <Task task=" Learn React"></Task>
        <br />
        <Task task=" Be Awesome!"></Task>
      </main>
    </>
  );
};

const Task = (props) => {
  return (
    <>
      <input type="checkbox" />
      {props.task}
    </>
  );
};

export default TodoList;
