import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  signupForm!: FormGroup;
  errorMsg: String | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern('^[^ ].*')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    this.router.navigate(['/login']);
  }

  async onSubmit() {
    if (this.signupForm.invalid) {
      this.errorMsg = "Please fill out all fields";
      return;
    }

    const { email, password, name } = this.signupForm.value;

    const result = await this.userService.registerUser(email, password, name);

    if (result.success) {
      this.router.navigate(['/']);
    } else {
      this.errorMsg = result.error;
    }
  }
}