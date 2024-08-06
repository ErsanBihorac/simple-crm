import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private firebaseService = inject(FirebaseService);
  username: string = '';
  email: string = '';
  password: string = '';

  setStateAndCreateUser() {
    this.username = 'Ersan Bihorac';
    this.email = 'ersan@mail.com';
    this.password = 'password';

    this.firebaseService.createUser(this.username, this.email, this.password);
  }
}
