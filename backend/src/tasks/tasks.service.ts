import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Task } from './entities/tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private tasksRepo: Repository<Task>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {

    if (!createTaskDto.title)
      throw new BadRequestException('Title is required');

    const task = new Task();
    task.title = createTaskDto.title;
    if (createTaskDto.parentId) {
      const parent = await this.tasksRepo.findOneBy({ id: createTaskDto.parentId });

      if (!parent)
        throw new BadRequestException('Parent task not found');

      task.parentId = parent.id;
    }
    return this.tasksRepo.save(task);
  }

  async findTopLevel(): Promise<Task[]> {
    return this.tasksRepo.find({ where: { parentId: IsNull() } });
  }

  async findSubtasks(parentId: number): Promise<Task[]> {
    return this.tasksRepo.find({ where: { parentId: parentId } });
  }

}