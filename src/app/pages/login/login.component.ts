
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
//import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

   // Define a FormControl named passwordControl for handling the username input
  passwordControl:FormControl = new FormControl('', Validators.required) //need to work on username and password validator instead of having separate!!!!
  usernameControl: FormControl = new FormControl('', Validators.required);

  errorMessage: string ='';

  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit() {
   
  }

  //method to handle login
  login(){
    console.log('Login button clicked');

    const unsername = this.usernameControl.value;
    const password = this.passwordControl.value;

    //now call the authentication service to validate the credentials
    const isAuthenticated= this.authService.authenticate(unsername,password);
    
    if(isAuthenticated){
      this.router.navigate(['home']); //if succesful navigate to the homepage
    }else{
      this.errorMessage='Invalid username and password'; //if authentication failed display the error message
    }

  }

}