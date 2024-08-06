import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private router: Router) { }
  private firebaseService = inject(FirebaseService);
  email: string = '';
  password: string = '';

  login() {
    this.email = 'ersan@mail.com';
    this.password = 'password';

    this.firebaseService.login(this.email, this.password).then(exists => {
      if (exists) {
        this.router.navigate(['/dashboard']);
      } else {
        console.log("Account doesn't exist");
      }
    })
  }
}
