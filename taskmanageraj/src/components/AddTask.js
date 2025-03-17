import React, { useState } from "react";
import { taskService } from "../services/TaskService"; 
import "../styles/AddTask.css";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!title || title.length < 10) newErrors.title = "Title is required and must be at least 10 characters long.";
    if (!description) newErrors.description = "Description is required.";
    if (!date) newErrors.date = "Date is required.";
    if (!priority) newErrors.priority = "Priority is required.";
    if (description.length > taskService.maxDescriptionLength) {
      newErrors.description = `Description cannot exceed ${taskService.maxDescriptionLength} characters.`;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const newTask = {
        id: Date.now(),
        title,
        description,
        date,
        priority,
      };

      try {
        taskService.addTask(newTask);
        setTitle("");
        setDescription("");
        setDate("");
        setPriority("medium");
        setErrors({});
      } catch (error) {
        setErrors({ description: error.message });
      }
    }
  };

  return (
    <div className="add-task">
      <h2>Add a New Task</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          {errors.description && <span className="error">{errors.description}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          {errors.date && <span className="error">{errors.date}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority:</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          {errors.priority && <span className="error">{errors.priority}</span>}
        </div>

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;
