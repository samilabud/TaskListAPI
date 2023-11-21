import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  tasks() {
    return this.taskService.getAllTasks();
  }
  @Post()
  createTask(@Body() newTask: CreateTaskDto) {
    const { title, description } = newTask;
    return this.taskService.createTask(title, description);
  }
  @Delete(':id')
  deleteTask(@Param('id') taskId: string) {
    return this.taskService.deleteTask(taskId);
  }
  @Patch(':id')
  updateTask(@Param('id') id: string, @Body() updateTask: UpdateTaskDto) {
    const { title, description, status } = updateTask;
    return this.taskService.updateTask(id, { title, description, status });
  }
}
