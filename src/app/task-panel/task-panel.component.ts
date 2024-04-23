import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-panel',
  templateUrl: './task-panel.component.html',
  styleUrls: ['./task-panel.component.scss'],
})
export class TaskPanelComponent {
  newTask: string = ''; //Declare newTask property
  tasks: { name: string, completed: boolean }[] = []; //Declare tasks property

  //Method to add new task to the array
  addTask() {
    //Check if input is not empty - 'trim' make sure there is no whitespaces
    if (this.newTask.trim() !== '') {
      //Push new task into array with the name of the new task and its completion status set to false
      this.tasks.push({ name: this.newTask, completed: false });
      this.newTask = ''; //Reset newTask after adding task
    }
  }

  //Method to mark a task as completed or not
  taskCompleted(event: any, task: {name: string, completed: boolean}){
    //updates the status of text based on the checkbox 
    task.completed=event.target.checked;
  }
}
