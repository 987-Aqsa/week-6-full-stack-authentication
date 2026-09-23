import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import "./App.css";

const API_URL = `${import.meta.env.VITE_API_URL}/api/tasks`;

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

  const [editingTask, setEditingTask] = useState(null);

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

    if (!title.trim() || !description.trim()) {
      setError("Please enter title and description");
      return;
    }

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

      setTasks((prevTasks) => [...prevTasks, data.task]);

      setTitle("");
      setDescription("");
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  // Start Editing
  const handleStartEdit = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setError("");
  };

  // Cancel Editing
  const handleCancelEdit = () => {
    setEditingTask(null);
    setTitle("");
    setDescription("");
    setError("");
  };

  // Update Task
  const handleUpdateTask = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      setError("Please enter title and description");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${API_URL}/${editingTask._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            title,
            description,
            completed: editingTask.completed
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to update task");
      }

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === editingTask._id ? data.task : task
        )
      );

      setEditingTask(null);
      setTitle("");
      setDescription("");
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  // Toggle Completed
  const handleToggleComplete = async (task) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${API_URL}/${task._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            completed: !task.completed
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to update task"
        );
      }

      setTasks((prevTasks) =>
        prevTasks.map((item) =>
          item._id === task._id ? data.task : item
        )
      );

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
        throw new Error(
          data.message || "Unable to delete task"
        );
      }

      setTasks((prevTasks) =>
        prevTasks.filter((task) => task._id !== id)
      );

      if (editingTask && editingTask._id === id) {
        handleCancelEdit();
      }

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
    setEditingTask(null);
    setTitle("");
    setDescription("");
    setError("");
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
  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

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
          onAdd={
            editingTask
              ? handleUpdateTask
              : handleAddTask
          }
          isEditing={Boolean(editingTask)}
          onCancel={handleCancelEdit}
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
          onEdit={handleStartEdit}
          onToggleComplete={handleToggleComplete}
        />
      </main>
    </div>
  );
}

export default App;