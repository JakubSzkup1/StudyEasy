import { Component, OnInit } from '@angular/core';
import { AuthService } from '../pages/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent  implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit():void {}
   // Implement the logout method
   logout(): void {
    // Call the logout method from the AuthService
    this.authService.logout();

    // Navigate to the login page after logout
    this.router.navigate(['/login']);
  }

}



