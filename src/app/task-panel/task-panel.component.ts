import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-panel',
  templateUrl: './task-panel.component.html',
  styleUrls: ['./task-panel.component.scss'],
})
export class TaskPanelComponent {
  newTask: string = ''; // Declare newTask property
  tasks: string[] = []; // Declare tasks property

  addTask() {
    if (this.newTask.trim() !== '') {
      this.tasks.push(this.newTask);
      this.newTask = ''; // Reset newTask after adding task
    }
  }
}
