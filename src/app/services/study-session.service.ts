import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


export interface StudySession {
  id?: string;
  title: string;
  description: string;
  date: string;
  time: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudySessionService {
  constructor(private firestore: AngularFirestore) {}

  addStudySession(session: StudySession) {
    return this.firestore.collection('studySessions').add(session);
  }

  getStudySessions(): Observable<StudySession[]> {
    return this.firestore.collection<StudySession>('studySessions').valueChanges({ idField: 'id' });
  }

  updateStudySession(sessionId: string, session: StudySession) {
    return this.firestore.collection('studySessions').doc(sessionId).update(session);
  }

  deleteStudySession(sessionId: string) {
    return this.firestore.collection('studySessions').doc(sessionId).delete();
  }
  
  getCompletedStudySessions(): Observable<StudySession[]> {
    return this.firestore.collection<StudySession>('completedStudySessions').valueChanges({ idField: 'id' });
  }
  markAsComplete(sessionId: string, session: StudySession) {
    const completedRef = this.firestore.collection('completedStudySessions').doc(sessionId);
    return this.firestore.firestore.runTransaction((transaction) => {
      transaction.set(completedRef.ref, session);
      transaction.delete(this.firestore.collection('studySessions').doc(sessionId).ref);
      return Promise.resolve();
    });
}
}