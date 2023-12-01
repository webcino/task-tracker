import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { Task } from '../../Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task).subscribe(
      () => {
        // Update the component's tasks array
        this.tasks = this.tasks.filter(t => t.id !== task.id);
      },
      error => {
        console.error('Error deleting task:', error);
      }
    );
  }

  toggleReminder(task: Task): void {
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe();
    // console.log(`Task '${task.text}' reminder is now ${task.reminder ? 'set' : 'unset'}`);
  }
}
