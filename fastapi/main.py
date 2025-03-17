from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import datetime

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Example tasks with 'completed' field
tasks = [
    {
        "id": 1,
        "title": "Complete React Project",
        "description": "Finish the React application with all the required features.",
        "priority": "high",
        "date": "2025-03-20",
        "completed": False
    },
    {
        "id": 2,
        "title": "Clean the House",
        "description": "Clean the living room, kitchen, and bathroom.",
        "priority": "medium",
        "date": "2025-03-17",
        "completed": False
    },
    {
        "id": 3,
        "title": "Buy Groceries",
        "description": "Purchase groceries for the week: fruits, vegetables, and snacks.",
        "priority": "low",
        "date": "2025-03-17",
        "completed": False
    },
  {
    "id": 4,
    "title": "Complete React project",
    "description": "Build the React app with all features.",
    "priority": "high",
    "date": "2025-03-17",
    "completed": False
  },
  {
    "id": 5,
    "title": "Study for Math exam",
    "description": "Review chapters 3 to 5 for the upcoming exam.",
    "date": "2025-03-17",
    "priority": "medium"
  },
  {
    "id": 6,
    "title": "Buy groceries",
    "description": "Purchase milk, eggs, and bread.",
    "date": "2025-03-20",
    "priority": "low"
  },
  {
    "id": 7,
    "title": "Clean the house",
    "description": "Vacuum and mop all rooms.",
    "date": "2025-03-23",
    "priority": "medium"
  },
  {
    "id": 8,
    "title": "Finish reading the book",
    "description": "Complete reading 'The Great Gatsby'.",
    "date": "2025-03-25",
    "priority": "low"
  },
  {
    "id": 9,
    "title": "Prepare presentation",
    "description": "Create slides for tomorrow's meeting.",
    "date": "2025-03-23",
    "priority": "high"
  },
  {
    "id": 10,
    "title": "Check emails",
    "description": "Respond to all urgent emails.",
    "date": "2025-03-24",
    "priority": "medium"
  }

]

class Task(BaseModel):
    id: int
    title: str
    description: str
    date: str
    priority: str
    completed: bool = False  # Default value is False

class TaskCreate(BaseModel):
    title: str
    description: str
    date: str
    priority: str

@app.get("/tasks", response_model=List[Task])
def get_tasks():
    return tasks

@app.get("/tasks/today", response_model=List[Task])
def get_tasks_for_today():
    today = str(datetime.date.today())
    return [task for task in tasks if task['date'] == today]

@app.get("/tasks/incomplete", response_model=List[Task])
def get_incomplete_tasks():
    return [task for task in tasks if not task["completed"]]

@app.post("/tasks", response_model=Task)
def add_task(task: TaskCreate):
    new_id = max([task['id'] for task in tasks], default=0) + 1
    new_task = {**task.dict(), 'id': new_id, 'completed': False}  # Default completed is False
    tasks.append(new_task)
    return new_task

@app.put("/tasks/{task_id}", response_model=Task)
def update_task(task_id: int, task: TaskCreate):
    for t in tasks:
        if t["id"] == task_id:
            t.update(task.dict())
            return t
    raise HTTPException(status_code=404, detail="Task not found")

@app.put("/tasks/{task_id}/complete", response_model=Task)
def complete_task(task_id: int):
    for task in tasks:
        if task["id"] == task_id:
            task["completed"] = True
            return task
    raise HTTPException(status_code=404, detail="Task not found")

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    global tasks
    tasks = [task for task in tasks if task['id'] != task_id]
    return {"message": "Task deleted successfully"}
