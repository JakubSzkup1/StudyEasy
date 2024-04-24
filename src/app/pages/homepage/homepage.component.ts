import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudySessionService, StudySession } from 'src/app/services/study-session.service';
import { UpcomingExamsService, Exam } from 'src/app/services/upcoming-exams.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  eventTitle: string = '';
  eventDate: string = '';
  eventTime: string = '';

  studySessions: StudySession[] = [];
  reminders: StudySession[] = [];
  completedStudySessions: StudySession[] = [];
  completedReminders: StudySession[] = [];
  editingSessionId?: string;

  exams: Exam[] = [];
  completedExams: Exam[] = [];
  newExam: Exam = { subject: '', date: '', time: '' };
  editingExamId?: string;

  constructor(
    private studySessionService: StudySessionService,
    private upcomingExamsService: UpcomingExamsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchAllItems();
  }
  
  fetchAllItems(): void {
    this.fetchStudySessions();
    this.fetchExams();
    this.fetchCompletedStudySessions();
    this.fetchCompletedExams();
  }
 
  fetchStudySessions(): void {
    this.studySessionService.getStudySessions().subscribe(sessions => {
      this.studySessions = sessions;
      this.reminders = sessions.filter(session => !this.completedStudySessions.some(completedSession => completedSession.id === session.id));
    });
  }
  
  fetchExams(): void {
    this.upcomingExamsService.getExams().subscribe(exams => {
      this.exams = exams;
    });
  }
  
  fetchCompletedStudySessions(): void {
    this.studySessionService.getCompletedStudySessions().subscribe(completedSessions => {
      this.completedStudySessions = completedSessions;
    });
  }
  
  fetchCompletedExams(): void {
    this.upcomingExamsService.getCompletedExams().subscribe(completedExams => {
      this.completedExams = completedExams;
    });
  }

  addEvent(): void {
    if (this.eventTitle && this.eventDate && this.eventTime) {
      const newSession: StudySession = {
        title: this.eventTitle,
        description: '',
        date: this.eventDate,
        time: this.eventTime
      };
      this.studySessionService.addStudySession(newSession).then(() => {
        this.fetchStudySessions();
        this.eventTitle = '';
        this.eventDate = '';
        this.eventTime = '';
      }).catch(error => {
        console.error('Error adding study session:', error);
      });
    }
  }

  editSession(sessionId?: string): void {
    if (sessionId) {
      this.editingSessionId = sessionId;
    } else {
      console.error('No session ID provided for editing');
    }
  }

  saveSession(): void {
    if (this.editingSessionId) {
      const sessionToUpdate = this.studySessions.find(session => session.id === this.editingSessionId);
      if (sessionToUpdate) {
        this.studySessionService.updateStudySession(this.editingSessionId, sessionToUpdate).then(() => {
          this.fetchStudySessions();
          this.editingSessionId = undefined;
        }).catch(error => {
          console.error('Error updating study session:', error);
        });
      }
    }
  }

  deleteEvent(sessionId?: string): void {
    if (sessionId) {
      this.studySessionService.deleteStudySession(sessionId).then(() => {
        this.fetchStudySessions();
      }).catch(error => {
        console.error('Error deleting study session:', error);
      });
    }
  }

  completeSession(sessionId?: string): void {
    if (sessionId) {
      const sessionToCompleteIndex = this.studySessions.findIndex(session => session.id === sessionId);
      if (sessionToCompleteIndex !== -1) {
        const sessionToComplete = this.studySessions.splice(sessionToCompleteIndex, 1)[0];
        this.studySessionService.markAsComplete(sessionId, sessionToComplete).then(() => {
          this.completedStudySessions.push(sessionToComplete);
          // Delete the session from the database
          this.studySessionService.deleteStudySession(sessionId).then(() => {
            console.log('Study session deleted from database.');
          }).catch(error => {
            console.error('Error deleting study session from database:', error);
          });
        }).catch(error => {
          console.error('Error completing study session:', error);
        });
      }
    }
  }
  

  cancelEdit(): void {
    this.editingSessionId = undefined;
  }

  addExam(): void {
    if (this.newExam.subject && this.newExam.date && this.newExam.time) {
      this.upcomingExamsService.addExam(this.newExam).then(() => {
        this.fetchExams();
        this.newExam = { subject: '', date: '', time: '' };
      }).catch(error => {
        console.error('Error adding exam:', error);
      });
    }
  }

  editExam(examId?: string): void {
    if (examId) {
      this.editingExamId = examId;
    } else {
      console.error('No exam ID provided for editing');
    }
  }

  saveExam(): void {
    if (this.editingExamId) {
      const examToUpdate = this.exams.find(exam => exam.id === this.editingExamId);
      if (examToUpdate) {
        this.upcomingExamsService.updateExam(this.editingExamId, examToUpdate).then(() => {
          this.fetchExams();
          this.editingExamId = undefined;
        }).catch(error => {
          console.error('Error updating exam:', error);
        });
      }
    }
  }

  deleteExam(examId?: string): void {
    if (examId) {
      this.upcomingExamsService.deleteExam(examId).then(() => {
        this.fetchExams();
      }).catch(error => {
        console.error('Error deleting exam:', error);
      });
    }
  }
  completeExam(examId?: string): void {
    if (examId) {
      const examToCompleteIndex = this.exams.findIndex(exam => exam.id === examId);
      if (examToCompleteIndex !== -1) {
        const examToComplete = this.exams.splice(examToCompleteIndex, 1)[0];
        this.upcomingExamsService.markAsComplete(examId, examToComplete).then(() => {
          this.completedExams.push(examToComplete);
          // Delete the exam from the database
          this.upcomingExamsService.deleteExam(examId).then(() => {
            console.log('Exam deleted from database.');
          }).catch(error => {
            console.error('Error deleting exam from database:', error);
          });
        }).catch(error => {
          console.error('Error completing exam:', error);
        });
      }
    }
  }
  
  
  goToPomodoro(): void {
    this.router.navigate(['/pomodoro']);
  }
}
