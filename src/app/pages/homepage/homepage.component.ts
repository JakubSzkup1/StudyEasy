import { Router } from '@angular/router';
import { UpcomingExamsService, Exam } from 'src/app/services/upcoming-exams.service';
import { StudySessionService, StudySession } from 'src/app/services/study-session.service';
import { Component, OnInit } from '@angular/core';

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
    this.fetchStudySessions();
    this.fetchCompletedStudySessions();
    this.fetchExams();
    this.fetchCompletedExams();
  }

  fetchStudySessions(): void {
    this.studySessionService.getStudySessions().subscribe(sessions => {
      this.studySessions = this.reminders = sessions; // Assign to both for mirroring
    });
  }

  fetchExams(): void {
    this.upcomingExamsService.getExams().subscribe(exams => {
      this.exams = exams;
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
        // Reset input fields after adding session
        this.eventTitle = '';
        this.eventDate = '';
        this.eventTime = '';
      }).catch(error => {
        console.error('Error adding study session:', error);
      });
    } else {
      console.error('Incomplete data for adding study session');
    }
  }

  editSession(sessionId?: string): void {
    if (sessionId) {
      this.editingSessionId = sessionId;
    }
  }

  saveSession(): void {
    if (this.editingSessionId) {
      const sessionToUpdate = this.studySessions.find(session => session.id === this.editingSessionId);
      if (sessionToUpdate) {
        this.studySessionService.updateStudySession(this.editingSessionId, sessionToUpdate).then(() => {
          this.fetchStudySessions();
          this.editingSessionId = undefined;
        });
      }
    }
  }

  deleteEvent(sessionId?: string): void {
    if (sessionId) {
      this.studySessionService.deleteStudySession(sessionId).then(() => {
        this.fetchStudySessions();
      });
    }
  }

  completeSession(sessionId?: string): void {
    if (sessionId) {
      const sessionToComplete = this.studySessions.find(session => session.id === sessionId);
      if (sessionToComplete) {
        this.studySessionService.markAsComplete(sessionId, sessionToComplete).then(() => {
          this.fetchStudySessions(); // Update the list after marking as complete
          this.fetchCompletedStudySessions(); // Fetch the updated list of completed sessions
        }).catch(error => {
          console.error('Error completing study session:', error);
        });
      }
    } else {
      console.error('No session ID provided for completing study session');
    }
  }

  fetchCompletedStudySessions(): void {
    this.studySessionService.getCompletedStudySessions().subscribe(completedSessions => {
      this.completedStudySessions = completedSessions;
    });
  }
  
  

  cancelEdit(): void {
    this.editingSessionId = undefined;
  }

  addExam(): void {
    this.upcomingExamsService.addExam(this.newExam).then(() => {
      this.fetchExams();
      this.newExam = { subject: '', date: '', time: '' };
    });
  }

  editExam(examId?: string): void {
    if (examId) {
      this.editingExamId = examId;
    }
  }

  saveExam(): void {
    if (this.editingExamId) {
      const examToUpdate = this.exams.find(exam => exam.id === this.editingExamId);
      if (examToUpdate) {
        this.upcomingExamsService.updateExam(this.editingExamId, examToUpdate).then(() => {
          this.fetchExams();
          this.editingExamId = undefined;
        });
      }
    }
  }

  deleteExam(examId?: string): void {
    if (examId) {
      this.upcomingExamsService.deleteExam(examId).then(() => {
        this.fetchExams();
      });
    }
  }

  completeExam(examId?: string): void {
    if (examId) {
      const examToComplete = this.exams.find(exam => exam.id === examId);
      if (examToComplete) {
        this.upcomingExamsService.markAsComplete(examId, examToComplete).then(() => {
          this.fetchExams(); // Update the list after marking as complete
          this.fetchCompletedExams(); // Fetch the updated list of completed exams
        }).catch(error => {
          console.error('Error completing exam:', error);
        });
      }
    } else {
      console.error('No exam ID provided for completing exam');
    }
  }

  fetchCompletedExams(): void {
    this.upcomingExamsService.getCompletedExams().subscribe(completedExams => {
      this.completedExams = completedExams;
    });
  }

  goToPomodoro(): void {
    this.router.navigate(['/pomodoro']); // Ensure this route is defined in your routing configuration
  }
}