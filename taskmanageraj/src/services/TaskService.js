class TaskService {
  constructor() {
    this.baseUrl = 'http://127.0.0.1:8000'; // FastAPI backend URL
    this.maxDescriptionLength = 400; // Maximum description length
  }

  async getTasksForToday() {
    const response = await fetch(`${this.baseUrl}/tasks/today`);
    if (!response.ok) {
      throw new Error('Failed to fetch tasks for today');
    }
    return response.json();
  }

  async getAllTasks() {
    const response = await fetch(`${this.baseUrl}/tasks`);
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    return response.json();
  }

  async deleteTask(id) {
    const response = await fetch(`${this.baseUrl}/tasks/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
    return response.json();
  }

  async addTask(task) {
    if (task.description.length > this.maxDescriptionLength) {
      throw new Error(`Description exceeds ${this.maxDescriptionLength} characters.`);
    }

    const response = await fetch(`${this.baseUrl}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error('Failed to add task');
    }
    return response.json();
  }

  async updateTask(updatedTask) {
    const response = await fetch(`${this.baseUrl}/tasks/${updatedTask.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    });
    if (!response.ok) {
      throw new Error('Failed to update task');
    }
    return response.json();
  }
}

export const taskService = new TaskService();
