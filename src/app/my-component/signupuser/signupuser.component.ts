import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Restaurant } from 'src/app/restaurant.model';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-signupuser',
  templateUrl: './signupuser.component.html',
  styleUrls: ['./signupuser.component.css'],
})
export class SignupuserComponent {
  @Input() restaurant!: Restaurant;
}
