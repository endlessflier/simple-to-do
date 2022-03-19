import "./styles.css";
import { useState, useRef } from "react";

function ToDoItem(props) {
  const { index, task, handleCheckbox } = props;

  return (
    <ul
      className={task.completed && "is-done"}
      onClick={() => handleCheckbox(index)}
    >
      {task.taskName}
    </ul>
  );
}
const initialTaskList = [
  { completed: true, taskName: "Interview 1" },
  { completed: false, taskName: "Interview 2" },
  { completed: false, taskName: "Interview 3" }
];

function ToDoListPanel() {
  const [toDoList, setToDoList] = useState(initialTaskList);
  const taskNameRef = useRef(null);

  const handleCheckbox = (currentIndex) => {
    const newToDoList = toDoList.map((task, index) =>
      currentIndex === index
        ? { completed: !task.completed, taskName: task.taskName }
        : task
    );
    setToDoList(newToDoList);
  };

  const handleAddTask = () => {
    if (taskNameRef.current.value) {
      setToDoList([
        ...toDoList,
        { completed: false, taskName: taskNameRef.current.value }
      ]);
      taskNameRef.current.value = "";
    }
  };
  return (
    <div>
      <h2>Todo List</h2>
      <input placeholder="enter task..." type="text" ref={taskNameRef} />
      <button onClick={handleAddTask}>Add</button>
      <h2>
        {toDoList.filter((task) => !task.completed).length} remaining out of{" "}
        {toDoList.length} tasks
      </h2>
      <li>
        {toDoList.map((task, index) => (
          <ToDoItem
            key={task.taskName + index.toString()}
            index={index}
            task={task}
            handleCheckbox={handleCheckbox}
          />
        ))}
      </li>
    </div>
  );
}
export default function App() {
  return (
    <div className="App">
      <ToDoListPanel />
    </div>
  );
}
