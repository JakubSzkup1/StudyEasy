
import { Component, OnInit } from '@angular/core';

interface Reminder {
  id: number;
  date: string;
  title: string;
  time: string;
  description: string;
}

interface Exam {
  id: number;
  subject: string;
  date: string;
  time: string;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  eventDate: string = '';
  eventTitle: string = '';
  eventTime: string = '';
  eventDescription: string = '';
  currentDate: Date = new Date();
  selectedMonth: number = this.currentDate.getMonth();
  selectedYear: number = this.currentDate.getFullYear();
  monthAndYear: string = '';
  weeks: any[] = [];
  years: number[] = [];
  reminders: Reminder[] = [];
  completedReminders: Reminder[] = [];
  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  editingSessionId: number | null = null;
  tempEventTitle: string = '';
  tempEventDescription: string = '';

  exams: Exam[] = [];
  completedExams: Exam[] = [];
  newExam: Exam = { id: 0, subject: '', date: '', time: '' };
  editingExamId: number | null = null;

  dayNames: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  constructor() {
    this.generateYears();
  }

  ngOnInit(): void {
  }

  generateYears(): void {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
      this.years.push(i);
    }
  }

  addEvent(): void {
    if (this.eventDate && this.eventTitle && this.eventTime) {
      const newId = this.reminders.length + 1;
      const newReminder: Reminder = {
        id: newId,
        date: this.eventDate,
        title: this.eventTitle,
        description: this.eventDescription,
        time: this.eventTime
      };
      this.reminders.push(newReminder);
      this.resetAddSessionForm();
    }
  }

  resetAddSessionForm(): void {
    this.eventDate = '';
    this.eventTitle = '';
    this.eventTime = '';
    this.eventDescription = '';
  }

  editSession(id: number): void {
    this.editingSessionId = id;
    const reminder = this.reminders.find(r => r.id === id);
    if (reminder) {
      this.tempEventTitle = reminder.title;
      this.tempEventDescription = reminder.description;
    }
  }

  saveSession(): void {
    if (this.editingSessionId !== null) {
      const index = this.reminders.findIndex(reminder => reminder.id === this.editingSessionId);
      if (index !== -1) {
        this.reminders[index].title = this.tempEventTitle;
        this.reminders[index].description = this.tempEventDescription;
        this.tempEventTitle = '';
        this.tempEventDescription = '';
      }
      this.editingSessionId = null;
    }
  }

  cancelEdit(): void {
    this.editingSessionId = null;
    this.tempEventTitle = '';
    this.tempEventDescription = '';
  }

  deleteEvent(id: number): void {
    this.reminders = this.reminders.filter(reminder => reminder.id !== id);
  }

  completeSession(id: number): void {
    const index = this.reminders.findIndex(reminder => reminder.id === id);
    if (index !== -1) {
      this.completedReminders.push(this.reminders[index]);
      this.reminders.splice(index, 1);
    }
  }

  addExam(): void {
    if (this.newExam.subject && this.newExam.date && this.newExam.time) {
      const newId = this.exams.length + 1;
      const newExam: Exam = {
        id: newId,
        subject: this.newExam.subject,
        date: this.newExam.date,
        time: this.newExam.time
      };
      this.exams.push(newExam);
      this.resetAddExamForm();
    }
  }

  resetAddExamForm(): void {
    this.newExam.subject = '';
    this.newExam.date = '';
    this.newExam.time = '';
  }

  editExam(id: number): void {
    this.editingExamId = id;
    const exam = this.exams.find(e => e.id === id);
    if (exam) {
      this.newExam.subject = exam.subject;
      this.newExam.date = exam.date;
      this.newExam.time = exam.time;
    }
  }

  saveExam(): void {
    if (this.editingExamId !== null) {
      const index = this.exams.findIndex(exam => exam.id === this.editingExamId);
      if (index !== -1) {
        this.exams[index].subject = this.newExam.subject;
        this.exams[index].date = this.newExam.date;
        this.exams[index].time = this.newExam.time;
      }
      this.editingExamId = null;
    }
  }

  cancelExamEdit(): void {
    this.editingExamId = null;
    this.resetAddExamForm();
  }

  deleteExam(id: number): void {
    this.exams = this.exams.filter(exam => exam.id !== id);
  }

  completeExam(id: number): void {
    const index = this.exams.findIndex(exam => exam.id === id);
    if (index !== -1) {
      this.completedExams.push(this.exams[index]);
      this.exams.splice(index, 1);
    }
  }
}
