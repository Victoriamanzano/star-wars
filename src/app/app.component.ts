import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { User } from './core/models';
import { AccountService } from './core/services';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent, RegisterComponent } from './components/account';

Router

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [CommonModule, RouterModule, NavbarComponent, LoginComponent, RegisterComponent]
  })

  export class AppComponent implements OnInit {
    title = 'STAR WARS';
    user: User | null = null;
    userFirstName: string | null = null;

  constructor(private accountService: AccountService, private router: Router) { }

    ngOnInit(): void {
      this.accountService.user.subscribe(user => {
        this.user = user;
        this.userFirstName = user?.firstName || null;
      });
    }


  logOut() {
    this.accountService.logOut();
    this.router.navigate(['/account/login']);
  }

  toggleLogin() {
    if (this.user) {
      this.logOut();
    } else {
      this.router.navigate(['/account/login']);
    }
  }

  getUserName(): string | null {
    return this.userFirstName;
  }


navigateToLogin() {
  this.router.navigate(['/account/login']);
}

navigateToRegister() {
  this.router.navigate(['/account/register']);
}

}
