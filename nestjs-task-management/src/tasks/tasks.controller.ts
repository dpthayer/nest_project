import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';


@Controller('tasks')
export class TasksController {
    constructor(private tasksService:TasksService) {}

    // @Get()
    // getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto) : Task[] {
    //     console.log(filterDto);
    //     if (Object.keys(filterDto).length) {
    //         return this.tasksService.getTasksWithFilters(filterDto);
    //     }
    //     else {
    //         return this.tasksService.getAllTasks();
    //     }
        
    // }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id:number) :Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto:CreateTaskDto): Promise<Task> {   
        return this.tasksService.createTask(createTaskDto);
    }

    // @Delete('/:id')
    // deleteTask(@Param('id') id:string):void {
    //     //console.log('delete id', id);
    //     this.tasksService.deleteTask(id);
    // }

    // @Patch('/:id/status')
    // updateTaskStatus(
    //     @Param('id') id:string,
    //     @Body('status', TaskStatusValidationPipe) status : TaskStatus,
    // ) : Task {
    //     console.log('update id', id);
    //     return this.tasksService.updateTaskStatus(id, status)
    // }
}
