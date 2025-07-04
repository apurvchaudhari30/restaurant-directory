import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './my-component/login/login.component';
import { SignUpComponent } from './my-component/sign-up/sign-up.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RestaurentComponent } from './restaurent/restaurent.component';
import { SignupuserComponent } from './my-component/signupuser/signupuser.component';
import { InterceptorService } from './service/interceptor.service';
import { HomeComponent } from './home/home.component';
import { RestaurantDetailsComponent } from './home/restaurant-details/restaurant-details.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    SignUpComponent,
    RestaurentComponent,
    SignupuserComponent,
    HomeComponent,
    RestaurantDetailsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
   providers: [
   {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ], 
  bootstrap: [AppComponent],
  exports:[
    LoginComponent
  ]
})
export class AppModule { }


