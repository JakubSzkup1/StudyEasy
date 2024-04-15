import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  // FormControl for username input with validation for required field
  usernameControl: FormControl = new FormControl('', Validators.required);
   // FormControl for password input with validation for required field
  passwordControl: FormControl = new FormControl('', Validators.required);
  errorMessage: string = '';   // Variable to store error message

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit() {
  }

  // Method to handle login process
  async login() {
    const username = this.usernameControl.value;
    const password = this.passwordControl.value;

    try {
      // Retrieve username and password values from form controls
      const result = await this.afAuth.signInWithEmailAndPassword(username, password);
      this.router.navigate(['home']); // If successful, navigate to home page
    } catch (error) {
      // If an error occurs during sign-in, log the error and display error message
      console.error('Error signing in:', error);
      this.errorMessage = 'Invalid username and password';
    }
  }
}
