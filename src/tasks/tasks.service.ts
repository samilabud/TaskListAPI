import { Injectable } from '@nestjs/common';
import { Task, TaskStatus, UpdateFields } from './task.entity';
import { v4 } from 'uuid';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task as TaskMongoEntity } from './schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(TaskMongoEntity.name)
    private taskModel: Model<TaskMongoEntity>,
  ) {}

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

  getAllFromMongoTask() {
    return this.taskModel.find().exec();
  }
  createMongoTask() {
    const createdCat = new this.taskModel({
      owner: 'samilabud@gmail.com',
      title: 'Test in nestjs',
      description: 'test description',
      status: 'PENDING',
    });
    return createdCat.save();
  }

  updateMongoTask(id: string, updateFields: UpdateFields) {
    return this.taskModel.updateOne({ _id: id }, updateFields).exec();
  }
}
