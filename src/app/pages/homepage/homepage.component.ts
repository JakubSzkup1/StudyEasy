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
  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  editingSessionId: number | null = null;
  tempEventTitle: string = '';
  tempEventDescription: string = '';

  exams: Exam[] = []; // Array to hold upcoming exams
  newExam: Exam = { id: 0, subject: '', date: '', time: '' }; // New exam object for adding
  editingExamId: number | null = null;

  dayNames: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  constructor() {
    this.generateYears();
   
  }

  ngOnInit(): void {
    // Logic for component initialization
  }

  generateYears(): void {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
      this.years.push(i);
    }
  }

  addEvent(): void {
    if (this.eventDate && this.eventTitle && this.eventTime) {
      const id = this.reminders.length + 1;
      const newReminder: Reminder = {
        id: id,
        date: this.eventDate,
        title: this.eventTitle,
        description: this.eventDescription,
        time: this.eventTime 
      };
      this.reminders.push(newReminder);
      this.eventDate = '';
      this.eventTitle = '';
      this.eventDescription = '';
      this.eventTime = ''; 
    }
  }

  deleteEvent(id: number): void {
    this.reminders = this.reminders.filter(reminder => reminder.id !== id);
  }

  editSession(id: number): void {
    const reminder = this.reminders.find(r => r.id === id);
    if (reminder) {
      this.editingSessionId = id;
      this.tempEventTitle = reminder.title;
      this.tempEventDescription = reminder.description;
    }
  }
  saveSession(): void {
    if (this.editingSessionId !== null) {
      const index = this.reminders.findIndex(reminder => reminder.id === this.editingSessionId);
      if (index !== -1) {
        this.reminders[index] = {
          ...this.reminders[index],
          title: this.reminders[index].title,
          date: this.reminders[index].date,
          time: this.reminders[index].time,
          description: this.reminders[index].description // Assuming you also want to save the description
        };
        // Reset the editing state
        this.editingSessionId = null;
      }
    }
  }

  cancelEdit(): void {
    this.editingSessionId = null;
  }

  addExam(): void {
    if (this.newExam.subject && this.newExam.date && this.newExam.time) {
      this.newExam.id = this.exams.length + 1;
      this.exams.push({ ...this.newExam });
      this.newExam = { id: 0, subject: '', date: '', time: '' }; // Reset newExam object
    }
  }

  editExam(id: number): void {
    const exam = this.exams.find(e => e.id === id);
    if (exam) {
      this.editingExamId = id;
      this.newExam = {...exam};
    }
  }

  saveExam(): void {
    if (this.editingExamId !== null) {
      // Find the index of the exam being edited
      const index = this.exams.findIndex(exam => exam.id === this.editingExamId);
      if (index !== -1) {
        // Update the exam at the found index
        this.exams[index] = {
          ...this.exams[index],
          subject: this.newExam.subject,
          date: this.newExam.date,
          time: this.newExam.time
        };
        // Reset editing state
        this.editingExamId = null;
        this.newExam = { id: 0, subject: '', date: '', time: '' }; // Reset newExam object
      }
    }
  }

  deleteExam(id: number): void {
    this.exams = this.exams.filter(exam => exam.id !== id);
  }



cancelExamEdit(): void {
  this.editingExamId = null; // Reset any editing flags or temporary data for exams
}

}