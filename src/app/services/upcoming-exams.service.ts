import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface Exam {
  id?: string; // Optional ID field
  subject: string; // Subject of the exam
  date: string; // Date of the exam
  time: string; // Time of the exam
}

@Injectable({
  providedIn: 'root' // Angular service provided in the root injector
})
export class UpcomingExamsService {
  constructor(private firestore: AngularFirestore) {}
// Method to add an exam to Firestore
  addExam(exam: Exam) {
    return this.firestore.collection('exams').add(exam);
  }
// Method to get an exam to Firestore
  getExams(): Observable<Exam[]> {
    return this.firestore.collection<Exam>('exams').valueChanges({ idField: 'id' });
  }

// Method to update an exam to Firestore
  updateExam(examId: string, exam: Exam) {
    return this.firestore.collection('exams').doc(examId).update(exam);
  }
// Method to delete an exam to Firestore
  deleteExam(examId: string) {
    return this.firestore.collection('exams').doc(examId).delete();
  }
// Method to get completed exam to Firestore
  getCompletedExams(): Observable<Exam[]> {
    return this.firestore.collection<Exam>('completedExams').valueChanges({ idField: 'id' });
  }
// Method to mark completed exam to Firestore
  markAsComplete(examId: string, exam: Exam) {
    const completedRef = this.firestore.collection('completedExams').doc(examId);
    return this.firestore.firestore.runTransaction((transaction) => {
      transaction.set(completedRef.ref, exam);
      transaction.delete(this.firestore.collection('exams').doc(examId).ref);
      return Promise.resolve();
    });
  }
}