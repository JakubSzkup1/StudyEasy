import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

// 
export interface Exam {
  id?: string;
  subject: string;
  date: string;
  time: string;
}

@Injectable({
  providedIn: 'root'
})
export class UpcomingExamsService {
  constructor(private firestore: AngularFirestore) {}

  addExam(exam: Exam) {
    return this.firestore.collection('exams').add(exam);
  }

  getExams(): Observable<Exam[]> {
    return this.firestore.collection<Exam>('exams').valueChanges({ idField: 'id' });
  }

  updateExam(examId: string, exam: Exam) {
    return this.firestore.collection('exams').doc(examId).update(exam);
  }

  deleteExam(examId: string) {
    return this.firestore.collection('exams').doc(examId).delete();
  }

  getCompletedExams(): Observable<Exam[]> {
    return this.firestore.collection<Exam>('completedExams').valueChanges({ idField: 'id' });
  }

  markAsComplete(examId: string, exam: Exam) {
    const completedRef = this.firestore.collection('completedExams').doc(examId);
    return this.firestore.firestore.runTransaction((transaction) => {
      transaction.set(completedRef.ref, exam);
      transaction.delete(this.firestore.collection('exams').doc(examId).ref);
      return Promise.resolve();
    });
  }
}