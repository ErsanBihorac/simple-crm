import { Component, Inject } from '@angular/core';
import { User } from 'src/models/user.class';
import { Firestore, addDoc, collection, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { initializeApp } from '@angular/fire/app';
@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  user = new User();
  birthDate!: Date;
  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);
  myCollection = collection(this.db, 'users');

  constructor(private firestore: Firestore) { }

  ngOnInit(): void {

  }

  async saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log('current user', this.user);

    await addDoc(this.myCollection, this.user.toJSON());
  }
}
