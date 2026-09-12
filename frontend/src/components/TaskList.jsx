import TaskItem from "./TaskItem";

function TaskList({ tasks, onDelete }) {
  if (tasks.length === 0) {
    return <p className="empty-message">No tasks found.</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TaskList;