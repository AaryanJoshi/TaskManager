// import React, { useEffect, useState } from "react";
// import { FaEdit, FaTrash } from 'react-icons/fa'; 
// import "../styles/TaskList2.css"; 

// const TaskList2 = () => {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortBy, setSortBy] = useState("date");
//   const [isEditing, setIsEditing] = useState(false);
//   const [taskToEdit, setTaskToEdit] = useState();

//   const apiBaseUrl = "http://127.0.0.1:8000"; 

//   // Fetch tasks when the component is mounted
//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await fetch(`${apiBaseUrl}/tasks`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch tasks.");
//         }
//         const fetchedTasks = await response.json();
//         setTasks(fetchedTasks);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to load tasks.");
//         setLoading(false);
//       }
//     };

//     fetchTasks();
//   }, []);

//   // Filter tasks based on search query
//   const filteredTasks = tasks.filter((task) =>
//     task.title.toLowerCase().includes(searchQuery.toLowerCase())||
//     task.description.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Sort tasks based on selected criteria
//   const sortedTasks = filteredTasks.sort((a, b) => {
//     if (sortBy === "date") {
//       const today = new Date().toLocaleDateString(); // Get today's date in the format MM/DD/YYYY
//       const taskDateA = new Date(a.date).toLocaleDateString(); // Format task A's date
//       const taskDateB = new Date(b.date).toLocaleDateString(); // Format task B's date
//       const todayDate = new Date(today); // Today's date as a Date object
//       const diffA = new Date(taskDateA) - todayDate; // Difference for task A (in milliseconds)
//       const diffB = new Date(taskDateB) - todayDate; // Difference for task B (in milliseconds)
//       return diffA - diffB; // Sort by the difference to today (ascending order)
//     }
//     else if (sortBy === "priority") {
//       const priorityOrder = { high: 1, medium: 2, low: 3 };
//       return priorityOrder[a.priority] - priorityOrder[b.priority];
//     }
//     return 0;
//   });

//   // Handle delete task
//   const handleDelete = async (taskId) => {
//     try {
//       const response = await fetch(`${apiBaseUrl}/tasks/${taskId}`, {
//         method: 'DELETE',
//       });
//       if (response.ok) {
//         setTasks(tasks.filter((task) => task.id !== taskId));
//       } else {
//         throw new Error("Failed to delete task.");
//       }
//     } catch (err) {
//       setError("Failed to delete task.");
//     }
//   };

//   // Handle edit task (open the edit form)
//   const handleEdit = (task) => {
//     setTaskToEdit(task);
//     setIsEditing(true);
//   };

//   // Handle task updates (save edited task)
//   const handleSaveEdit = async (editedTask) => {
//     try {
//       const response = await fetch(`${apiBaseUrl}/tasks/${editedTask.id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(editedTask),
//       });
//       if (response.ok) {
//         setTasks(
//           tasks.map((task) =>
//             task.id === editedTask.id ? { ...task, ...editedTask } : task
//           )
//         );
//         setIsEditing(false);
//         setTaskToEdit();
//       } else {
//         throw new Error("Failed to update task.");
//       }
//     } catch (err) {
//       setError("Failed to update task.");
//     }
//   };

//   // Handle cancel editing
//   const handleCancelEdit = () => {
//     setIsEditing(false);
//     setTaskToEdit();
//   };

//   if (loading) {
//     return <p>Loading tasks...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div className="task-list-all">
//       <h2>All Tasks</h2>

//       <div className="filters">
//         <input
//           type="text"
//           placeholder="Search tasks"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         <select onChange={(e) => setSortBy(e.target.value)}>
//           <option value="date">Sort by Due Date</option>
//           <option value="priority">Sort by Priority</option>
//         </select>
//       </div>

//       {sortedTasks.length === 0 ? (
//         <p>No tasks available.</p>
//       ) : (
//         <ul className="task-items-ul">
//           {sortedTasks.map((task) => (
//             <li key={task.id} className="task-item">
//               <div className="task-details">
//                 <h3>{task.title}</h3>
//                 <p>{task.description}</p>
//                 <p>
//                   <strong>Due Date:</strong> {task.date}
//                 </p>
//                 <p>
//                   <strong>Priority:</strong> {task.priority}
//                 </p>
//               </div>

//               <div className="task-actions">
//                 <button
//                   className="edit-btn"
//                   onClick={() => handleEdit(task)}
//                 >
//                   <FaEdit />
//                 </button>
//                 <button
//                   className="delete-btn"
//                   onClick={() => handleDelete(task.id)}
//                 >
//                   <FaTrash />
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}

//       <div className="modal">
//       {isEditing && (
//         <div className="edit-task-form">
//           <h3>Edit Task</h3>
//           <form
//             onSubmit={(e) => {
//               e.preventDefault();
//               handleSaveEdit(taskToEdit);
//             }}
//           >
//             <input
//               type="text"
//               value={taskToEdit.title}
//               onChange={(e) =>
//                 setTaskToEdit({ ...taskToEdit, title: e.target.value })
//               }
//             />
//             <textarea
//               value={taskToEdit.description}
//               onChange={(e) =>
//                 setTaskToEdit({ ...taskToEdit, description: e.target.value })
//               }
//             />
//             <select
//               value={taskToEdit.priority}
//               onChange={(e) =>
//                 setTaskToEdit({ ...taskToEdit, priority: e.target.value })
//               }
//             >
//               <option value="high">High</option>
//               <option value="medium">Medium</option>
//               <option value="low">Low</option>
//             </select>
//             <button type="submit">Save</button>
//             <button type="button" onClick={handleCancelEdit}>
//               Cancel
//             </button>
//           </form>
//         </div>
//       )}
//       </div>
//     </div>
//   );
// };

// export default TaskList2;

import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from 'react-icons/fa'; 
import "../styles/TaskList2.css"; 

const TaskList2 = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [isEditing, setIsEditing] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState();

  const apiBaseUrl = "http://127.0.0.1:8000"; 

  // Fetch tasks when the component is mounted
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/tasks`);
        if (!response.ok) {
          throw new Error("Failed to fetch tasks.");
        }
        const fetchedTasks = await response.json();
        setTasks(fetchedTasks);
        setLoading(false);
      } catch (err) {
        setError("Failed to load tasks.");
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Filter tasks based on search query
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort tasks based on selected criteria
  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortBy === "date") {
      const today = new Date().toLocaleDateString();
      const taskDateA = new Date(a.date).toLocaleDateString();
      const taskDateB = new Date(b.date).toLocaleDateString();
      const todayDate = new Date(today);
      const diffA = new Date(taskDateA) - todayDate;
      const diffB = new Date(taskDateB) - todayDate;
      return diffA - diffB;
    }
    else if (sortBy === "priority") {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return 0;
  });

  // Handle delete task
  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(`${apiBaseUrl}/tasks/${taskId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setTasks(tasks.filter((task) => task.id !== taskId));
      } else {
        throw new Error("Failed to delete task.");
      }
    } catch (err) {
      setError("Failed to delete task.");
    }
  };

  // Handle edit task (open the edit form)
  const handleEdit = (task) => {
    setTaskToEdit(task);
    setIsEditing(true);
  };

  // Handle task updates (save edited task)
  const handleSaveEdit = async (editedTask) => {
    try {
      const response = await fetch(`${apiBaseUrl}/tasks/${editedTask.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedTask),
      });
      if (response.ok) {
        setTasks(
          tasks.map((task) =>
            task.id === editedTask.id ? { ...task, ...editedTask } : task
          )
        );
        setIsEditing(false);
        setTaskToEdit();
      } else {
        throw new Error("Failed to update task.");
      }
    } catch (err) {
      setError("Failed to update task.");
    }
  };

  // Handle cancel editing
  const handleCancelEdit = () => {
    setIsEditing(false);
    setTaskToEdit();
  };

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="task-list-all">
      <h2>All Tasks</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search tasks"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="date">Sort by Due Date</option>
          <option value="priority">Sort by Priority</option>
        </select>
      </div>

      {sortedTasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul className="task-items-ul">
          {sortedTasks.map((task) => (
            <li key={task.id} className="task-item">
              <div className="task-details">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>
                  <strong>Due Date:</strong> {task.date}
                </p>
                <p>
                  <strong>Priority:</strong> {task.priority}
                </p>
              </div>

              <div className="task-actions">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(task)}
                >
                  <FaEdit />
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(task.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal for editing the task */}
      {isEditing && (
        <>
          <div className="edit-task-overlay" onClick={handleCancelEdit}></div>
          <div className="edit-task-form">
            <h3>Edit Task</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveEdit(taskToEdit);
              }}
            >
              <input
                type="text"
                value={taskToEdit.title}
                onChange={(e) =>
                  setTaskToEdit({ ...taskToEdit, title: e.target.value })
                }
              />
              <textarea
                value={taskToEdit.description}
                onChange={(e) =>
                  setTaskToEdit({ ...taskToEdit, description: e.target.value })
                }
              />
              <select
                value={taskToEdit.priority}
                onChange={(e) =>
                  setTaskToEdit({ ...taskToEdit, priority: e.target.value })
                }
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <button type="submit">Save</button>
              <button type="button" onClick={handleCancelEdit}>
                Cancel
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskList2;
