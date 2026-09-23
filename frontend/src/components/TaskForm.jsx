function TaskForm({
  title,
  description,
  setTitle,
  setDescription,
  onAdd,
  isEditing,
  onCancel
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
      ></textarea>

      <div className="form-buttons">
        <button type="submit">
          {isEditing ? "Update Task" : "Add Task"}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            className="cancel-button"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;