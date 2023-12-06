import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { Task } from '../../Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  // Call this method after updating the task list
  updateView() {
    this.cdr.detectChanges();
  }

  addTask(newTask: Task): void {
    this.tasks.push(newTask);
    // Optionally, you can trigger change detection
    this.updateView();
  }

  deleteTask(task: Task): void {
    // Optionally, you can trigger change detection
    this.updateView();
    this.taskService.deleteTask(task).subscribe(
      () => {
        this.tasks = this.tasks.filter((t) => t.id !== task.id);
      },
      (error) => {
        console.error('Error deleting task:', error);
      }
    );
  }

  toggleReminder(task: Task): void {
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe();
  }
}
