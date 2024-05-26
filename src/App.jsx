import { useState } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim().length > 0) {
      e.preventDefault();
      submitTask();
    }
  };

  const submitTask = () => {
    if (inputValue.trim()) {
      setTasks([...tasks, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeTask = (indexToRemove) => {
    setConfirmDeleteIndex(indexToRemove);
  };

  const confirmDeleteTask = () => {
    setTasks(tasks.filter((_, index) => index !== confirmDeleteIndex));
    setConfirmDeleteIndex(null);
  };

  const cancelDeleteTask = () => {
    setConfirmDeleteIndex(null);
  };

  return (
    <div className='app-container'>
      <h1 className='app-title'>My Tasks</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          className='input-field'
          type='text'
          placeholder='New task...'
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          value={inputValue}
        />
        <button className='submit-button' type='button' onClick={submitTask}>
          Add Task
        </button>
      </form>

      <ul className='task-list'>
        {tasks.map((item, index) => (
          <li
            key={index}
            className={index % 2 === 0 ? "even-task" : "odd-task"}
          >
            {item}
            <button className='remove-button' onClick={() => removeTask(index)}>
              Remove task
            </button>
          </li>
        ))}
      </ul>

      {confirmDeleteIndex !== null && (
        <div className='modal'>
          <div className='modal-content'>
            <p>Are you sure you want to delete this task?</p>
            <div>
              <button onClick={confirmDeleteTask}>Yes</button>
              <button onClick={cancelDeleteTask}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
