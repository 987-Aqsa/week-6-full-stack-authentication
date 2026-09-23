import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  onDelete,
  onEdit,
  onToggleComplete
}) {
  if (tasks.length === 0) {
    return (
      <p className="no-tasks">
        No tasks yet. Add your first task!
      </p>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  );
}

export default TaskList;