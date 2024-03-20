import { Component, OnInit } from '@angular/core';

interface Reminder {
  id: number;
  date: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  eventDate: string = '';
  eventTitle: string = '';
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

  dayNames: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  constructor() {
    this.generateYears();
    this.showCalendar(this.selectedMonth, this.selectedYear);
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
    if (this.eventDate && this.eventTitle) {
      const id = this.reminders.length + 1;
      const newReminder: Reminder = {
        id: id,
        date: this.eventDate,
        title: this.eventTitle,
        description: this.eventDescription
      };
      this.reminders.push(newReminder);
  
      const selectedDate = new Date(this.eventDate);
      const day = selectedDate.getDate();
      const month = selectedDate.getMonth();
      const year = selectedDate.getFullYear();
      this.markSelectedDate(day, month, year);
  
      this.eventDate = '';
      this.eventTitle = '';
      this.eventDescription = '';
    }
  }
  
  markSelectedDate(day: number, month: number, year: number): void {
    for (const week of this.weeks) {
      for (const date of week) {
        if (date.date === day && date.month === month && date.year === year) {
          date.hasEvent = true;
          return;
        }
      }
    }
  }
  

  deleteEvent(id: number): void {
    const index = this.reminders.findIndex(reminder => reminder.id === id);
    if (index !== -1) {
      this.reminders.splice(index, 1);
      this.showCalendar(this.selectedMonth, this.selectedYear);
    }
  }

  previous(): void {
    if (this.selectedMonth === 0) {
      this.selectedMonth = 11;
      this.selectedYear--;
    } else {
      this.selectedMonth--;
    }
    this.showCalendar(this.selectedMonth, this.selectedYear);
  }

  next(): void {
    if (this.selectedMonth === 11) {
      this.selectedMonth = 0;
      this.selectedYear++;
    } else {
      this.selectedMonth++;
    }
    this.showCalendar(this.selectedMonth, this.selectedYear);
  }

  jump(): void {
    this.showCalendar(this.selectedMonth, this.selectedYear);
  }

  isToday(day: any): boolean {
    const today = new Date();
    return day.year === today.getFullYear() && day.month === today.getMonth() && day.date === today.getDate();
  }

  getDaysInMonth(month: number, year: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  showCalendar(month: number, year: number): void {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = this.getDaysInMonth(month, year);
    const monthAndYear = this.months[month] + ' ' + year;
    const calendar = [];

    let date = 1;
    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          week.push({ date: null, month, year, monthName: this.months[month] });
        } else if (date > daysInMonth) {
          break;
        } else {
          const remindersForDay = this.getRemindersForDay(date, month, year);
          week.push({ date, month, year, monthName: this.months[month], reminders: remindersForDay });
          date++;
        }
      }
      calendar.push(week);
      if (date > daysInMonth) {
        break;
      }
    }

    this.selectedMonth = month;
    this.selectedYear = year;
    this.monthAndYear = monthAndYear;
    this.weeks = calendar;
  }

  selectDate(day: any): void {
    if (day.date !== null) {
      console.log('Selected Date:', day);
    }
  }

  getRemindersForDay(date: number, month: number, year: number): Reminder[] {
    return this.reminders.filter(reminder => {
      const reminderDate = new Date(reminder.date);
      return reminderDate.getDate() === date && reminderDate.getMonth() === month && reminderDate.getFullYear() === year;
    });
  }

  displayReminders(): void {
  }

  hasEvent(day: any): boolean {
    return day.reminders && day.reminders.length > 0;
  }

  getEvents(day: any): Reminder[] {
    return day.reminders;
  }
}
