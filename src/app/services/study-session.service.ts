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
    return this.firestore.collection<StudySession>('studySessions').valueChanges();
  }

  updateStudySession(sessionId: string, session: StudySession) {
    return this.firestore.collection('studySessions').doc(sessionId).update(session);
  }

  deleteStudySession(sessionId: string) {
    return this.firestore.collection('studySessions').doc(sessionId).delete();
  }
  
  markAsComplete(sessionId: string, sessionData: StudySession) {
    return this.firestore.collection('completedStudySessions').doc(sessionId).set(sessionData)
      .then(() => console.log("Marked as complete successfully."))
      .catch(error => console.error("Failed to mark as complete:", error));

      
  }
  
  getCompletedStudySessions(): Observable<StudySession[]> {
    return this.firestore.collection<StudySession>('completedStudySessions').valueChanges();
  }
}
