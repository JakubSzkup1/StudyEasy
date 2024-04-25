// Import necessary modules and services
import { Router } from '@angular/router'; // Import Router module from Angular router
import { UpcomingExamsService, Exam } from 'src/app/services/upcoming-exams.service'; // Import UpcomingExamsService and Exam interface from respective files
import { StudySessionService, StudySession } from 'src/app/services/study-session.service'; // Import StudySessionService and StudySession interface from respective files
import { Component, OnInit } from '@angular/core'; // Import Component and OnInit interfaces from Angular core

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'] // Styles specific to this component
})
export class HomepageComponent implements OnInit {
  // Variables for adding study sessions
  eventTitle: string = ''; // Title of the event
  eventDate: string = ''; // Date of the event
  eventTime: string = ''; // Time of the event

  // Arrays to store study sessions and exams
  studySessions: StudySession[] = []; // Array to store upcoming study sessions
  reminders: StudySession[] = []; // Array to store reminders
  completedStudySessions: StudySession[] = []; // Array to store completed study sessions
  completedReminders: StudySession[] = []; // Array to store completed reminders
  editingSessionId?: string; // ID of the session being edited

  exams: Exam[] = []; // Array to store upcoming exams
  completedExams: Exam[] = []; // Array to store completed exams
  newExam: Exam = { subject: '', date: '', time: '' }; // New exam object to be added
  editingExamId?: string; // ID of the exam being edited

  constructor(
    private studySessionService: StudySessionService, // Inject StudySessionService
    private upcomingExamsService: UpcomingExamsService, // Inject UpcomingExamsService
    private router: Router // Inject Router for navigation
  ) {}

  ngOnInit(): void {
    // Fetch data on component initialization
    this.fetchStudySessions(); // Fetch study sessions
    this.fetchCompletedStudySessions(); // Fetch completed study sessions
    this.fetchExams(); // Fetch upcoming exams
    this.fetchCompletedExams(); // Fetch completed exams
  }

  // Fetch study sessions from the service
  fetchStudySessions(): void {
    this.studySessionService.getStudySessions().subscribe(sessions => {
      this.studySessions = this.reminders = sessions; // Assign to both for mirroring
    });
  }

  // Fetch exams from the service
  fetchExams(): void {
    this.upcomingExamsService.getExams().subscribe(exams => {
      this.exams = exams;
    });
  }

  // Add a new study session
  addEvent(): void {
    if (this.eventTitle && this.eventDate && this.eventTime) {
      const newSession: StudySession = {
        title: this.eventTitle,
        description: '',
        date: this.eventDate,
        time: this.eventTime
      };
      this.studySessionService.addStudySession(newSession).then(() => {
        this.fetchStudySessions(); // Update study sessions list
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

  // Edit a study session
  editSession(sessionId?: string): void {
    if (sessionId) {
      this.editingSessionId = sessionId;
    }
  }

  // Save changes to a study session
  saveSession(): void {
    if (this.editingSessionId) {
      const sessionToUpdate = this.studySessions.find(session => session.id === this.editingSessionId);
      if (sessionToUpdate) {
        this.studySessionService.updateStudySession(this.editingSessionId, sessionToUpdate).then(() => {
          this.fetchStudySessions(); // Update study sessions list
          this.editingSessionId = undefined;
        });
      }
    }
  }

  // Delete a study session
  deleteEvent(sessionId?: string): void {
    if (sessionId) {
      this.studySessionService.deleteStudySession(sessionId).then(() => {
        this.fetchStudySessions(); // Update study sessions list
      });
    }
  }

  // Mark a study session as complete
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

  // Fetch completed study sessions
  fetchCompletedStudySessions(): void {
    this.studySessionService.getCompletedStudySessions().subscribe(completedSessions => {
      this.completedStudySessions = completedSessions;
    });
  }
  
  // Cancel editing a study session
  cancelEdit(): void {
    this.editingSessionId = undefined;
  }

  // Add a new exam
  addExam(): void {
    this.upcomingExamsService.addExam(this.newExam).then(() => {
      this.fetchExams(); // Update exams list
      this.newExam = { subject: '', date: '', time: '' }; // Reset input fields after adding exam
    });
  }

  // Edit an exam
  editExam(examId?: string): void {
    if (examId) {
      this.editingExamId = examId;
    }
  }

  // Save changes to an exam
  saveExam(): void {
    if (this.editingExamId) {
      const examToUpdate = this.exams.find(exam => exam.id === this.editingExamId);
      if (examToUpdate) {
        this.upcomingExamsService.updateExam(this.editingExamId, examToUpdate).then(() => {
          this.fetchExams(); // Update exams list
          this.editingExamId = undefined;
        });
      }
    }
  }

  // Delete an exam
  deleteExam(examId?: string): void {
    if (examId) {
      this.upcomingExamsService.deleteExam(examId).then(() => {
        this.fetchExams(); // Update exams list
      });
    }
  }

  // Mark an exam as complete
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

  // Fetch completed exams
  fetchCompletedExams(): void {
    this.upcomingExamsService.getCompletedExams().subscribe(completedExams => {
      this.completedExams = completedExams;
    });
  }

  // Navigate to Pomodoro timer
  goToPomodoro(): void {
    this.router.navigate(['/pomodoro']); // route set in app module
  }
}
