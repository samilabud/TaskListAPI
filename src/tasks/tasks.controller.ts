import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
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
  @HttpCode(200)
  tasks() {
    return this.taskService.getAllTasks();
  }
  @Post()
  @HttpCode(200)
  createTask(@Body() newTask: CreateTaskDto) {
    const { title, description } = newTask;
    return this.taskService.createTask(title, description);
  }
  @Delete(':id')
  @HttpCode(200)
  deleteTask(@Param('id') taskId: string) {
    return this.taskService.deleteTask(taskId);
  }
  @Patch(':id')
  updateTask(@Param('id') id: string, @Body() updateTask: UpdateTaskDto) {
    const { title, description, status } = updateTask;
    return this.taskService.updateTask(id, { title, description, status });
  }
}
