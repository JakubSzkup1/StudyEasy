import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface Notice {
  id?: string;
  title: string;
  message: string;
  tags?: string[]; //Tags property
  
}



//This is where all the firebase backend happens for retrieving and getting data
@Injectable({
  providedIn: 'root',
})
export class NoticeService {
  
  constructor(private firestore: AngularFirestore) {}

  

  //Add notices to firebase
  addNotice(notice: Notice) {
    return this.firestore.collection('notices').add(notice);
  }

  //Get Notices from firebase
  getNotices(): Observable<Notice[]> {
    return this.firestore.collection<Notice>('notices').valueChanges({ idField: 'id' });
  }

  //Delete notice from firebase
  deleteNotice(noticeID:string){
    return this.firestore.collection('notices').doc(noticeID).delete();

  }



  // more methods for updating will be added here (updating & deleting etc.)
  
}