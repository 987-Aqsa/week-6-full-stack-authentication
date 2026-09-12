function TaskItem({ task, onDelete }) {
  return (
    <div className="task-item">
      <div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
      </div>

      <button
        className="delete-btn"
        onClick={() => onDelete(task._id)}
      >
        Delete
      </button>
    </div>
  );
}

export default TaskItem;