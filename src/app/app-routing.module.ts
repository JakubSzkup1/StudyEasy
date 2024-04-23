import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { HomepageComponent } from './pages/homepage/homepage.component'; 
import { PomodoroComponent } from './pages/pomodoro/pomodoro.component';
import { TimetableComponent } from './pages/timetable/timetable.component';
import { NoticeBoardComponent } from './pages/notice-board/notice-board.component';
import { WeeklyTimetableComponent } from './pages/weekly-timetable/weekly-timetable.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegistrationComponent
  },
  {
    path: 'home',
    component: HomepageComponent
  },
  {
    path: 'pomodoro',
    component: PomodoroComponent
  },
  {
    path: 'timetable',
    component: TimetableComponent
  },
  {
    path: 'notice-board',
    component: NoticeBoardComponent
  },

  {
    path: 'about-us',
   component: AboutusComponent
  },
 
 
  

  {
    path: '**',
    redirectTo: 'login'
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
