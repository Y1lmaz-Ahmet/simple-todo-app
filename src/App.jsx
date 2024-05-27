import { useState } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  // login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // hardcoded credentials for demo purposes
  const validUsername = "user01";
  const validPassword = "test123";
  // show login credentials on login screen
  const [showLoginCredentials, setShowLoginCredentials] = useState(false);

  const loginCredentialsPeek = () => {
    setShowLoginCredentials(!showLoginCredentials);
  };

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

  const handleLogin = () => {
    if (username === validUsername && password === validPassword) {
      setIsLoggedIn(true);
    } else {
      alert("sorry, login credentials not correct");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  const editTask = (index) => {
    setEditIndex(index);
    setEditValue(tasks[index]);
  };

  const updateTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? editValue : task
    );
    setTasks(updatedTasks);
    setEditIndex(null);
    setEditValue("");
  };

  // login credentials check
  if (!isLoggedIn) {
    return (
      <div className='login-container'>
        <h1>Login</h1>
        <input
          type='text'
          placeholder='username...'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type='password'
          placeholder='password...'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className='tooltip-container'>
          <button onClick={handleLogin}>login</button>
          <button className='tooltip-button' onClick={loginCredentialsPeek}>
            ?
          </button>
          <p className='tooltip-text'>
            {showLoginCredentials ? (
              <p>
                For demo purposes, use Username:{" "}
                <span
                  style={{
                    color: "green",
                    fontWeight: "bold",
                    textDecoration: "underline",
                  }}
                >
                  user01
                </span>
                , Password:{" "}
                <span
                  style={{
                    color: "green",
                    fontWeight: "bold",
                    textDecoration: "underline",
                  }}
                >
                  test123
                </span>
              </p>
            ) : (
              ""
            )}
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className='app-container'>
      <h1 className='app-title'>{username}'s tasks</h1>
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
            {editIndex === index ? (
              <input
                type='text'
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
            ) : (
              item
            )}
            <button className='remove-button' onClick={() => removeTask(index)}>
              Remove task
            </button>
            {editIndex === index ? (
              <button
                className='update-button'
                onClick={() => updateTask(index)}
              >
                Save
              </button>
            ) : (
              <button className='update-button' onClick={() => editTask(index)}>
                Update
              </button>
            )}
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
