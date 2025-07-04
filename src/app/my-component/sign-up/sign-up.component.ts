import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signupForm!: FormGroup;
  mobilePattern = '^((\\+91-?)|0)?[6-9]\\d{9}$';

  constructor(
    private formbuilder: FormBuilder,
    private apiService: ApiService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formbuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[A-Za-z ]*$')]],
      email: ['', [Validators.required, Validators.email]],
       mobile: ['', [
    Validators.required,
    Validators.pattern(/^\d{10}$/)  
  ]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
        ],
      ],
    });

    this.signupForm.get('name')?.valueChanges.subscribe((value) => {
      if (value && typeof value === 'string') {
        const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
        if (value !== capitalized) {
          this.signupForm
            .get('name')
            ?.setValue(capitalized, { emitEvent: false });
        }
      }
    });
  }

  signUp() {
    this.apiService.signup(this.signupForm.value).subscribe({
      next: (res: any) => {
        alert('Signup Successfully');
        this.signupForm.reset();
        this._router.navigate(['/login']);
      },
      error: (err: any) => {
        console.error('Signup Error:', err);
        alert(err.message);
      },
    });
  }
}
// function allowOnlyAlphabets(
//   event: Event | undefined,
//   KeyboardEvent: {
//     new (type: string, eventInitDict?: KeyboardEventInit): KeyboardEvent;
//     prototype: KeyboardEvent;
//     readonly DOM_KEY_LOCATION_STANDARD: 0;
//     readonly DOM_KEY_LOCATION_LEFT: 1;
//     readonly DOM_KEY_LOCATION_RIGHT: 2;
//     readonly DOM_KEY_LOCATION_NUMPAD: 3;
//   }
// ) {
//   throw new Error('Function not implemented.');
// }
