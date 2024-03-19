import { Component } from '@angular/core';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  subject: string = '';
  time: string = '';
  day: string = '';

  addSession() {
    // Your session adding logic here
  }
}