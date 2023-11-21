import { Injectable } from '@nestjs/common';
import { Task, TaskStatus, UpdateFields } from './task.entity';
import { v4 } from 'uuid';
@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: '1',
      title: 'First task',
      description: 'Some Task',
      status: TaskStatus.PENDING,
    },
  ];

  getAllTasks() {
    return this.tasks;
  }
  createTask(title: string, description: string) {
    const task = {
      id: v4(),
      title,
      description,
      status: TaskStatus.PENDING,
    };
    this.tasks.push(task);
    return this.tasks;
  }
  updateTask(id: string, updateFields: UpdateFields) {
    const taskToUpdate = this.tasks.find((task) => task.id === id);
    const newTask = Object.assign(taskToUpdate, updateFields);
    this.tasks = this.tasks.map((task) => (task.id === id ? newTask : task));
    return this.tasks;
  }

  deleteTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return this.tasks;
  }
}
