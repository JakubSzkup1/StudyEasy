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
  usernameControl: FormControl = new FormControl('', Validators.required);

  isButtonDisabled: boolean = false; // Initially disable the button

  constructor() { }

  ngOnInit() {
   
  }

  //method to handle login
  login(){
    console.log('Login button clicked');
  }

  // Method to enable the button
  enableButton() {
    this.isButtonDisabled = false;
  }

}
