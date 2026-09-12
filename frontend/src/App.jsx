import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import "./App.css";

const API_URL = "http://localhost:5000/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("token"))
  );

  const [showSignup, setShowSignup] = useState(false);

  // Fetch Tasks
  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const fetchTasks = async () => {
      const token = localStorage.getItem("token");

      setLoading(true);
      setError("");

      try {
        const response = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load tasks");
        }

        setTasks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [isAuthenticated]);

  // Add Task
  const handleAddTask = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          description
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to add task");
      }

      const newTask = data.task || data;

      setTasks((prevTasks) => [...prevTasks, newTask]);

      setTitle("");
      setDescription("");
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  // Delete Task
  const handleDeleteTask = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to delete task");
      }

      setTasks((prevTasks) =>
        prevTasks.filter((task) => task._id !== id)
      );

      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setTasks([]);
    setIsAuthenticated(false);
    setShowSignup(false);
  };

  // Login/Signup screen
  if (!isAuthenticated) {
    return (
      <div className="app">
        <header className="app-header">
          <h1>Task Manager</h1>
        </header>

        {showSignup ? (
          <>
            <Signup
              onSignupSuccess={() => {
                setShowSignup(false);
              }}
            />

            <p className="auth-switch">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setShowSignup(false)}
              >
                Login
              </button>
            </p>
          </>
        ) : (
          <>
            <Login
              onLoginSuccess={() => {
                setIsAuthenticated(true);
              }}
            />

            <p className="auth-switch">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setShowSignup(true)}
              >
                Sign Up
              </button>
            </p>
          </>
        )}
      </div>
    );
  }

  // Logged-in user
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>Task Manager</h1>

          {user && <p>Welcome, {user.name}</p>}
        </div>

        <button onClick={handleLogout}>Logout</button>
      </header>

      <main className="app-container">
        <TaskForm
          title={title}
          description={description}
          setTitle={setTitle}
          setDescription={setDescription}
          onAdd={handleAddTask}
        />

        {loading && (
          <p className="loading">Loading tasks...</p>
        )}

        {error && (
          <p className="error-message">{error}</p>
        )}

        <TaskList
          tasks={tasks}
          onDelete={handleDeleteTask}
        />
      </main>
    </div>
  );
}

export default App;