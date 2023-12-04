import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/Task';
import { TaskService } from 'src/app/service/task.service';

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


  constructor(private taskService : TaskService){}
  ngOnInit(): void {
    
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
        // You can perform additional logic if needed
      },
      (error) => {
        console.error('Error adding task to the server:', error);
        // Handle the error as needed
      }
    );
  }
    
}

