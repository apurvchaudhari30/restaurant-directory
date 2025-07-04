import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  loginForm!: FormGroup;
 
  constructor(private formbuilder: FormBuilder, private _http:HttpClient, private _router:Router, private apiService:ApiService ) { }

  ngOnInit(): void 
  {
    this.loginForm = this.formbuilder.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  signupPage(){
    this._router.navigate(["/sign-up"]);
  }

logIn() {
  if (this.loginForm.valid) {    
    this.apiService.login(this.loginForm.value).subscribe(
      (res) => {
        alert('Login successful');

        localStorage.setItem("users", JSON.stringify(res.user));

        if (res.source === 'admin') {
          this._router.navigate(['/restaurent']);
        } else if (res.source === 'user') {
          this._router.navigate(['/home']);
        }

        this.loginForm.reset();
      },
      (err) => {
        console.error('Login error:', err);
        alert('Invalid email or password');
      }
    );
  } else {
    console.warn('Form is invalid');
  }
}

  public loginevent(){
    ("hello")
  }
  public MarvellousEevent(){
    console.log("Hello")

  }
  
  }

