import { Component, OnInit } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { Firestore, collection, getFirestore, updateDoc, doc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit {
  user!: User;
  userId!: string;
  loading = false;
  birthDate!: Date;


  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);
  colRef = collection(this.db, 'users');
  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>, private firestore: Firestore) { }

  ngOnInit(): void {

  }

  saveUser() {
    this.loading = true;
    //       the reference to the document   the value to update the document
    //                      |                            |
    updateDoc(doc(this.colRef, this.userId), this.user.toJSON());
    this.loading = false;
    this.dialogRef.close();
  }
}
