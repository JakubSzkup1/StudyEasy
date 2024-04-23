import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-panel',
  templateUrl: './task-panel.component.html',
  styleUrls: ['./task-panel.component.scss'],
})
export class TaskPanelComponent {
  newTask: string = ''; //Declare newTask property
  tasks: { name: string, completed: boolean }[] = []; //Declare tasks property

ngOnInit()
{

  //once component initliazis, load tasks from session storage 
  const storedTasks = sessionStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
}

  //Method to add new task to the array
  addTask() {
    //Check if input is not empty - 'trim' make sure there is no whitespaces
    if (this.newTask.trim() !== '') {
      //Push new task into array with the name of the new task and its completion status set to false
      this.tasks.push({ name: this.newTask, completed: false });
      this.newTask = ''; //Reset newTask after adding task
      this.saveTasksToSessionStorage();

      //Save the tasks to session storage after adding a new task
      sessionStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }

  //Method to mark a task as completed or not
  taskCompleted(event: any, task: {name: string, completed: boolean}){
    //updates the status of text based on the checkbox 
    task.completed=event.target.checked;
    this.saveTasksToSessionStorage();
  }

    //Save tasks to session storage after marking tasks
    private saveTasksToSessionStorage(){
      sessionStorage.setItem('tasks', JSON.stringify(this.tasks));
    } 

    //Method to save task to session storage.
    deleteTask(index: number) {
      this.tasks.splice(index, 1); //remove element from array
      this.saveTasksToSessionStorage();
    }
  }

