import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  //Dummy method while firebase authentication gets sorted
  authenticate(username: string, password: string): boolean{
    if(username=== 'admin' && password === 'password'){
      //Authentication succesful
      return true;
    }else {
      //Authentication failed
      return false;
    }

  }

  // Logout method
  logout(): void {
    localStorage.removeItem('token'); // Clear stored token
  }
}
