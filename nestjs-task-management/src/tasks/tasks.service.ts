import { Injectable, NotFoundException, Param, Body, ParseIntPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
   constructor(
       @InjectRepository(TaskRepository)
       private taskRepository : TaskRepository,
   ) {}

    // getAllTasks() : Task[]{
    //     return this.tasks;
    // }

    // getTasksWithFilters(filterdto: GetTaskFilterDto) : Task[]{
    //     const { status, search } = filterdto;
    //     let tasks = this.getAllTasks();
    //     if (status){
    //         tasks = tasks.filter(task => task.status === status)
    //     }
    //     if (search) {
    //         tasks = tasks.filter( task => task.title.includes(search) ||
    //         task.description.includes(search),);
    //     }

    //     return tasks;
    // }

    async getTaskById(id:number) : Promise<Task>{
        const found = await this.taskRepository.findOne(id);
        if (!found) {
             throw new NotFoundException('Task with ID "${id}" not found');
        }
        return found;
    }
    
    async createTask(createTaskDto:CreateTaskDto) : Promise<Task> {
        const { title, description } = createTaskDto;
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;        
        await task.save();
        return task;
    }

    // deleteTask(id:string): void {
    //     //console.log('delete id', id);
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter(task => task.id !== id);
    //    // console.log('tasks', this.tasks);
    // }

    // updateTaskStatus(
    //     @Param('id', ParseIntPipe) id: number, 
    //     @Body('status', TaskStatusValidationPipe) status :TaskStatus) : Task {
    //     console.log('update service id', id);
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }
}
