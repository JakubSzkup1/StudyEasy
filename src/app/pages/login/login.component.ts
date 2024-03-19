import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

   // Define a FormControl named passwordControl for handling the username input
  passwordControl:FormControl = new FormControl('', Validators.required) //need to work on username and password validator instead of having separate!!!!
  constructor() { }

  ngOnInit() {}

}
