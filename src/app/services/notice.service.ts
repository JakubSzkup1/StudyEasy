import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface Notice {
  id?: string;
  title: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class NoticeService {
  constructor(private firestore: AngularFirestore) {}

  addNotice(notice: Notice) {
    return this.firestore.collection('notices').add(notice);
  }

  getNotices(): Observable<Notice[]> {
    return this.firestore.collection<Notice>('notices').valueChanges({ idField: 'id' });
  }

  // more methods for updating will be added here
  
}