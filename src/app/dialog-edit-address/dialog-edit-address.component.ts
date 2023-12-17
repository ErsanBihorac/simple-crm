import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.class';
import { MatDialogRef } from '@angular/material/dialog';
import { Firestore, collection, getFirestore } from '@angular/fire/firestore';
import { initializeApp } from '@angular/fire/app';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent implements OnInit {
  user!: User;
  userId!: string;
  loading = false;


  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);
  myCollection = collection(this.db, 'users');

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>, private firestore: Firestore) { }

  ngOnInit(): void {

  }

  saveUser() {

  }
}
