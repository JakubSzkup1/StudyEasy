// Import necessary modules and components
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { WeekCalendarComponent } from './pages/week-calendar/week-calendar.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavbarComponent } from './navbar/navbar.component';
import { PomodoroComponent } from './pages/pomodoro/pomodoro.component';
import { TimetableComponent } from './pages/timetable/timetable.component';
import { NoticeBoardComponent } from './pages/notice-board/notice-board.component';
import { MilestoneComponent } from './pages/milestones/milestones.component';
import { TaskPanelComponent } from './task-panel/task-panel.component';
import { WeeklyTimetableComponent } from './pages/weekly-timetable/weekly-timetable.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomepageComponent,
    WeekCalendarComponent,
    NavbarComponent,
    PomodoroComponent,
    TimetableComponent,
    NoticeBoardComponent,
    MilestoneComponent,
    TaskPanelComponent,
    WeeklyTimetableComponent
    
   

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule, // Add FormsModule to imports
    
    
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideAnimationsAsync()],
  bootstrap: [AppComponent],
  
})
export class AppModule {}
