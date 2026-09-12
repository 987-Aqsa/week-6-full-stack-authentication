function TaskForm({
  title,
  description,
  setTitle,
  setDescription,
  onAdd,
}) {
  return (
    <form onSubmit={onAdd} className="task-form">
      <input
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Enter task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;