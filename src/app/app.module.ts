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



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomepageComponent
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
    FormsModule // Add FormsModule to imports
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
