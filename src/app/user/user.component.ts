import { Component, OnInit, inject, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { Firestore, addDoc, collection, getFirestore, onSnapshot } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { initializeApp } from '@angular/fire/app';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  user = new User();
  allUsers: any = [];

  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);
  myCollection = collection(this.db, 'users');
  colRef = collection(this.db, 'users');
  firestore: Firestore = inject(Firestore);

  constructor(public dialog: MatDialog,) {
    this.user.firstName
  }

  ngOnInit(): void {
    onSnapshot(this.colRef, (snapshot) => {
      this.allUsers = []; // clear the array, has to be done so that the data doesn't repeat itself
      snapshot.docs.forEach((doc) => {
        this.allUsers.push({ ...doc.data(), customIdName: doc.id }) // take the data on change and paste it into the array allUsers (being displayed in the table)
      })
      console.log(this.allUsers); // log out new the new database
    })
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
