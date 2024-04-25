import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Import Firestore module
import { Observable } from 'rxjs'; // Import Observable from RxJS

// Define the structure of a study session
export interface StudySession {
  id?: string; // Optional ID field
  title: string;
  description: string;
  date: string;
  time: string;
}

@Injectable({
  providedIn: 'root' // Angular service provided in the root injector
})
export class StudySessionService {
  constructor(private firestore: AngularFirestore) {}// Inject Firestore 

   // Method to add a study session to Firestore
  addStudySession(session: StudySession) {
    return this.firestore.collection('studySessions').add(session);
  }
 // Method to GET A session to Firestore
  getStudySessions(): Observable<StudySession[]> {
    return this.firestore.collection<StudySession>('studySessions').valueChanges({ idField: 'id' });
  }
// Method to update session to Firestore
  updateStudySession(sessionId: string, session: StudySession) {
    return this.firestore.collection('studySessions').doc(sessionId).update(session);
  }
// Method to delete session to Firestore
  deleteStudySession(sessionId: string) {
    return this.firestore.collection('studySessions').doc(sessionId).delete();
  }
  // Method to get completed session to Firestore
  getCompletedStudySessions(): Observable<StudySession[]> {
    return this.firestore.collection<StudySession>('completedStudySessions').valueChanges({ idField: 'id' });
  }
   // Method to mark as complete to Firestore
  markAsComplete(sessionId: string, session: StudySession) {
    const completedRef = this.firestore.collection('completedStudySessions').doc(sessionId);
    return this.firestore.firestore.runTransaction((transaction) => {
      transaction.set(completedRef.ref, session);
      transaction.delete(this.firestore.collection('studySessions').doc(sessionId).ref);
      return Promise.resolve();
    });
}
}