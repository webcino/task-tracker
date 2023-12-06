import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

import { Task } from 'src/app/Task';
import { UIService } from 'src/app/service/ui.service';
import { TaskService } from 'src/app/service/task.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask : EventEmitter<Task> = new EventEmitter()
  text: string = ''; 
  day: string = '';
  reminder: boolean = false;
  showAddTask! : boolean;
  subscription! : Subscription


  constructor(private taskService: TaskService, private uiService: UIService ,private cdr: ChangeDetectorRef) {
    this.subscription = this.uiService.onToggle().subscribe(value => (this.showAddTask = value))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  
  ngOnInit(): void {
    
  }

  // Call this method after updating the task list
  updateView() {
    this.cdr.detectChanges();
  }

  onSubmit(text: string, day: string, reminder: boolean) {
    if (!text) {
      alert("Please Add A Task");
      return;
    }

    const newTask: Task = {
      text: text,
      day: day,
      reminder: reminder
    };

    this.onAddTask.emit(newTask);

    this.taskService.addTask(newTask).subscribe(
      (addedTask: Task) => {
        console.log('Task successfully added to the server:', addedTask);
      },
      (error) => {
        console.error('Error adding task to the server:', error);
        // Handle the error as needed
      }
      );
    }
  this.updateView()
    
}

