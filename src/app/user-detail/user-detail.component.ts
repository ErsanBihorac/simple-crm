import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, collection, doc, getFirestore, onSnapshot } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { initializeApp } from '@angular/fire/app';
import { User } from 'src/models/user.class';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  userId: any = '';
  user: User = new User();

  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);
  myCollection = collection(this.db, 'users');
  colRef = collection(this.db, 'users');
  firestore: Firestore = inject(Firestore);

  constructor(private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');
      console.log('GOT ID', this.userId);
      this.getUser();
    })
  }

  getUser() {
    onSnapshot(doc(this.colRef, this.userId), (snapshot: any) => {
      let user: any = { ...snapshot.data(), customIdName: snapshot.id };
      this.user = new User(user);
      console.log(this.user);
    }) //Lernhinweis: die ForEach schleife musste weg da es keine mehrere key-werte gab.
    // die daten kann man direkt an das user-json binden und anschließend übergeben!
  }

  editMenu() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }

  editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }
}
