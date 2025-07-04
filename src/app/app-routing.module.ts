import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './my-component/sign-up/sign-up.component';
import { LoginComponent } from './my-component/login/login.component';
import { RestaurentComponent } from './restaurent/restaurent.component';
import { SignupuserComponent } from './my-component/signupuser/signupuser.component';
import { AuthGuardService as AuthGuard } from './service/auth-guard.service';
import { HomeComponent } from './home/home.component';
import { RestaurantDetailsComponent } from './home/restaurant-details/restaurant-details.component';


const routes: Routes = [  {
  path: '', redirectTo: 'login',pathMatch: 'full'
},
{
 path: 'login', component: LoginComponent
},
{
 path: 'sign-up', component: SignUpComponent,
}, 
{
 path:'restaurent' , component: RestaurentComponent, canActivate: [AuthGuard],
},
{
  path:'signupuser' , component:SignupuserComponent,canActivate: [AuthGuard],
},
{
  path:'restaurant-details/:id' , component:RestaurantDetailsComponent,
},
{
 path: 'home', component: HomeComponent,
}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
