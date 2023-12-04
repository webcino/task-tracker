import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/Task';

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


  constructor(){}
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
    console.log(newTask)
  }

}
