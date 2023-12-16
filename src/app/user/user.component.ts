import { Component, OnInit, inject, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { Firestore, addDoc, collection, getFirestore, } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { initializeApp } from '@angular/fire/app';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  user = new User();
  allUsers:any = [];

  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);
  myCollection = collection(this.db, 'users');
  firestore: Firestore = inject(Firestore);

  constructor(public dialog: MatDialog,) {
    this.user.firstName
  }

  ngOnInit(): void {
    collection(this.firestore, 'users')
      .valueChanges()
      .subscribe((changes: any) => {
        console.log('Received changes from DB', changes)
      });
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
