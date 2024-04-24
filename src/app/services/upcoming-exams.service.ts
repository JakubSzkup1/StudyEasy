import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

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

  markAsComplete(examId: string, examData: Exam) {
    return this.firestore.collection('completedExams').doc(examId).set(examData)
      .then(() => console.log("Exam marked as complete successfully."))
      .catch(error => console.error("Failed to mark exam as complete:", error));
  }
}
