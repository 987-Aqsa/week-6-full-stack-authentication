function TaskItem({
  task,
  onDelete,
  onEdit,
  onToggleComplete
}) {
  return (
    <div className="task-item">
      <div className="task-content">
        <div className="task-title-row">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task)}
          />

          <h3 className={task.completed ? "completed" : ""}>
            {task.title}
          </h3>
        </div>

        <p className={task.completed ? "completed" : ""}>
          {task.description}
        </p>

        <p className="task-status">
          Status: {task.completed ? "Completed" : "Pending"}
        </p>
      </div>

      <div className="task-actions">
        <button
          type="button"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => onDelete(task._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;