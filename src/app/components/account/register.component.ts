import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from '@app/core/services';

@Component({
  selector:'app-register',
  standalone: true,
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, RouterModule]
 })

 export class RegisterComponent implements OnInit {

  form!: FormGroup;
  loading = false;
  submitted = false;
  error?: string;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private accountService: AccountService) {
      if (this.accountService.userValue) {
          this.router.navigate(['/']);
      }
  }

  ngOnInit() {
      this.form = this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          username: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]]
      });
  }

  get f() { return this.form.controls }

  onSubmit() {
      this.submitted = true;
      this.error = '';

      if (this.form.invalid) {
          return;
      }

      this.loading = true;
      this.accountService.signUp(this.form.value).pipe(first()).subscribe({
        next: () => {this.router.navigate(['/account/login'], { queryParams: { registered: true }});
    },
         error: error => { this.error = error;
          this.loading = false;
    }
  });
  }
}
