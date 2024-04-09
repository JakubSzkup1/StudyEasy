import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent  implements OnInit {
  // FormControl for email input with validation for required field
  emailControl: FormControl = new FormControl('', Validators.required);
  // FormControl for password input with validation for required field
  passwordControl: FormControl = new FormControl('', Validators.required);
  errorMessage: string = '';   // Variable to store error message

  constructor( 
    private afAuth: AngularFireAuth,
    private router: Router ) { }

  ngOnInit() {}

  // Method to handle user registration
  async register() {
     // Retrieve email and password values from form controls
    const email = this.emailControl.value;
    const password = this.passwordControl.value;

    try {
      // create user account with provided email and password
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      this.router.navigate(['home']); // If successful, navigate to home page
    } catch (error) {
      // If an error occurs during registration, log the error and display error message
      console.error('Error registering user:', error);
      this.errorMessage = 'Registration failed';
    }
  }
}
