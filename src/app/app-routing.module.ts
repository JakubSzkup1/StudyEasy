import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { HomepageComponent } from './pages/homepage/homepage.component'; // Adjust the path as per your project structure


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
    //loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
    
  {
    path: 'register',
    component: RegistrationComponent
  },
  {
    path: 'home', // Path for the homepage
    component: HomepageComponent // Specify the HomepageComponent for this route
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
