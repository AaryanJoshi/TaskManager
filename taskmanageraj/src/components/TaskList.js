import React, { useState, useEffect } from 'react';
import { FiEdit } from "react-icons/fi";
import { IoMdDoneAll } from "react-icons/io";
import { FaRegTrashAlt} from "react-icons/fa"; // Add check icons for completed tasks
import '../styles/TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('asc'); // Default sort by priority ASC
  const [selectedTask, setSelectedTask] = useState(); // State to store the selected task
  const [editedTask, setEditedTask] = useState(); // State to store the task being edited
  const [taskUpdated, setTaskUpdated] = useState(false); // State to force task list re-render

  // Update task
  const updateTask = async (updatedTask) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${updatedTask.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });

      if (response.ok) {
        setTaskUpdated(!taskUpdated); // Toggle state to force re-render
        setEditedTask(null); // Clear the edited task state and close the edit form
        setSelectedTask(null); // Close the modal after saving
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`); // Adjust URL as per your FastAPI endpoint
      const data = await response.json();

      // Get today's date in the format YYYY-MM-DD
      const today = new Date().toISOString().split('T')[0]; // This will give the date in YYYY-MM-DD format

      // Filter tasks to only include those for today
      const todayTasks = data.filter(task => task.date === today);

      setTasks(todayTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Update task completion status
  const markComplete = async (e,taskId) => {
    e.stopPropagation();
    try {
      const taskToUpdate = tasks.find(task => task.id === taskId);
      taskToUpdate.completed = !taskToUpdate.completed; // Toggle completed status

      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${taskId}/complete`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: taskToUpdate.completed }),
      });

      if (response.ok) {
        setTaskUpdated(!taskUpdated); // Toggle state to force re-render
      }
    } catch (error) {
      console.error('Error marking task as complete:', error);
    }
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    deleteTask(id);
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setTaskUpdated(!taskUpdated); // Toggle state to force re-render
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  useEffect(() => {
    fetchTasks(); // Fetch tasks when the component mounts or taskUpdated changes
  }, [taskUpdated]); // Fetch tasks again when taskUpdated changes

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortBy === 'asc') {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    } else {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
  });

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'high-priority';
      case 'medium':
        return 'medium-priority';
      case 'low':
        return 'low-priority';
      default:
        return '';
    }
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task); // Set the clicked task to show in the modal
  };

  const closeModal = () => {
    setSelectedTask(null); // Close the modal by resetting the selected task
    setEditedTask(null); // Clear the edited task when closing the modal
  };

  const handleEdit = (task) => {
    setEditedTask({ ...task }); // Set the task details to the edited task state for modification
    setSelectedTask(null); // Close the selected task view if editing
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveEdit = () => {
    updateTask(editedTask); // Update the task with the edited values
  };

  return (
    <div className="task-list">
      <h2>Tasks for Today</h2>
      <div className="filters">
        <input
          type="text"
          placeholder="Search tasks"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="asc">Sort by Priority ASC</option>
          <option value="desc">Sort by Priority DESC</option>
        </select>
      </div>

      <ul className="ul-tasks">
        {sortedTasks
          .filter((task) => !task.completed) // Filter out completed tasks
          .map((task) => (
            <li
              key={task.id}
              className={`task-item ${task.completed ? 'completed' : ''}`}
              onClick={() => handleTaskClick(task)} // Open the modal when clicking the task item
            >
              {editedTask && editedTask.id === task.id ? (
                <div className="edit-task-form">
                  <input
                    type="text"
                    name="title"
                    value={editedTask.title}
                    onChange={handleEditChange}
                  />
                  <textarea
                    name="description"
                    value={editedTask.description}
                    onChange={handleEditChange}
                  />
                  <select
                    name="priority"
                    value={editedTask.priority}
                    onChange={handleEditChange}
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                  <button onClick={handleSaveEdit}>Save</button>
                  <button onClick={() => setEditedTask(null)}>Cancel</button>
                </div>
              ) : (
                <div className="task-info">
                  <span className="task-title">{task.title}</span>
                  <span className={`task-priority ${getPriorityClass(task.priority)}`}>
                    {task.priority}
                  </span>
                  <button
                    onClick={(e) => markComplete(e,task.id)} 
                    className="complete-btn"
                  ><IoMdDoneAll/>
                  </button>
                  <button onClick={() => handleEdit(task)} className="edit-btn">
                    <FiEdit />
                  </button>
                </div>
              )}
              <button onClick={(e) => handleDelete(e, task.id)} className="delete-btn">
                <FaRegTrashAlt />
              </button>
            </li>
          ))}
      </ul>

      {/* Modal to show complete task details */}
      {(selectedTask || editedTask) && (
        <div className="task-modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>X</span>
            {editedTask ? (
              <div className="edit-task-form">
                <h3>Edit Task</h3>
                <input
                  type="text"
                  name="title"
                  value={editedTask.title}
                  onChange={handleEditChange}
                />
                <textarea
                  name="description"
                  value={editedTask.description}
                  onChange={handleEditChange}
                />
                <select
                  name="priority"
                  value={editedTask.priority}
                  onChange={handleEditChange}
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={() => setEditedTask(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <h3>{selectedTask.title}</h3>
                <p><strong>Description:</strong> {selectedTask.description}</p>
                <p><strong>Due Date:</strong> {selectedTask.date}</p>
                <p><strong>Priority:</strong> {selectedTask.priority}</p>
                <button onClick={() => handleEdit(selectedTask)} className="edit-btn">
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
