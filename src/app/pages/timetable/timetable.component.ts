import { Component, OnInit } from '@angular/core';

interface TimetableEntry {
  day: string;
  time: string;
  subject: string;
  type: string; // Lecture or Practical
  room: string;
}

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss'],
})
export class TimetableComponent implements OnInit {
  currentGroup: string = 'Group A';
  timetable: { [group: string]: TimetableEntry[] } = {
    'Group A': [
      { day: 'Monday', time: '10:00 AM', subject: 'Database Mgmt Systems', type: 'Lecture', room: 'Room 996' },
      { day: 'Monday', time: '12:00 PM', subject: 'Graphy Theory', type: 'Lecture', room: 'Room 996' },
      { day: 'Monday', time: '1:00 PM', subject: 'Mobile App Dev', type: 'Lecture', room: 'Room 996' },
      { day: 'Monday', time: '3:00 PM', subject: 'Adv. Data Centric Web App', type: 'Lecture', room: 'Room 996' },
      { day: 'Monday', time: '4:00 PM', subject: 'PPIT', type: 'Practical', room: 'Room 481' },
      { day: 'Tuesday', time: '9:00 AM', subject: 'Adv. Data Centric Web App', type: 'Practical', room: 'Room 484' },
      { day: 'Tuesday', time: '1:00 PM', subject: 'Mobile App Dev', type: 'Lecture', room: 'Room 1039' },
      { day: 'Tuesday', time: '3:00 PM', subject: 'Mobile App Dev', type: 'Practical', room: 'Room 470' },
      { day: 'Wednesday', time: '9:00 AM', subject: 'PPIT', type: 'Lecture', room: 'Room 208' },
      { day: 'Wednesday', time: '11:00 AM', subject: 'Graphy Theory', type: 'Lecture', room: 'Room 208' },
      { day: 'Wednesday', time: '12:00 PM', subject: 'PPIT', type: 'Lecture', room: 'Room 996' },
      { day: 'Wednesday', time: '1:00 PM', subject: 'Database Mgmt Systems', type: 'Lecture', room: 'Room 996' },
      { day: 'Wednesday', time: '3:00 PM', subject: 'Software Testing', type: 'Lecture', room: 'Room 939' },
      { day: 'Wednesday', time: '4:00 PM', subject: 'Software Testing', type: 'Practical', room: 'Room 483' },
      { day: 'Thursday', time: '1:00 PM', subject: 'Graph Theory', type: 'Practical', room: 'Room 304' },
      { day: 'Thursday', time: '3:00 PM', subject: 'Database Mgmt Systems', type: 'Practical', room: 'Room 481' }
    ],
    'Group B': [
      { day: 'Monday', time: '10:00 AM', subject: 'Database Mgmt Systems', type: 'Lecture', room: 'Room 996' },
      { day: 'Monday', time: '12:00 PM', subject: 'Graphy Theory', type: 'Lecture', room: 'Room 996' },
      { day: 'Monday', time: '1:00 PM', subject: 'Mobile App Dev', type: 'Lecture', room: 'Room 996' },
      { day: 'Monday', time: '3:00 PM', subject: 'Adv. Data Centric Web App', type: 'Lecture', room: 'Room 996' },
      { day: 'Monday', time: '4:00 PM', subject: 'Software Testing', type: 'Practical', room: 'Room 479' },
      { day: 'Tuesday', time: '9:00 AM', subject: 'PPIT', type: 'Practical', room: 'Room 470' },
      { day: 'Tuesday', time: '12:00 PM', subject: 'Graphy Theory', type: 'Practical', room: 'Room 436' },
      { day: 'Tuesday', time: '1:00 PM', subject: 'Mobile App Dev', type: 'Lecture', room: 'Room 1039' },
      { day: 'Wednesday', time: '9:00 AM', subject: 'PPIT', type: 'Lecture', room: 'Room 208' },
      { day: 'Wednesday', time: '11:00 AM', subject: 'Graphy Theory', type: 'Lecture', room: 'Room 208' },
      { day: 'Wednesday', time: '12:00 PM', subject: 'PPIT', type: 'Lecture', room: 'Room 996' },
      { day: 'Wednesday', time: '1:00 PM', subject: 'Database Mgmt Systems', type: 'Lecture', room: 'Room 996' },
      { day: 'Wednesday', time: '3:00 PM', subject: 'Software Testing', type: 'Lecture', room: 'Room 939' },
      { day: 'Thursday', time: '9:00 AM', subject: 'Adv. Data Centric Web App', type: 'Practical', room: 'Room 907' },
      { day: 'Thursday', time: '12:00 PM', subject: 'Database Mgmt Systems', type: 'Practical', room: 'Room 484' },
      { day: 'Thursday', time: '3:00 PM', subject: 'Mobile App Dev', type: 'Practical', room: 'Room 479' }
    ],
    'Group C': [
      { day: 'Monday', time: '10:00 AM', subject: 'Database Mgmt Systems', type: 'Lecture', room: 'Room 996' },
      { day: 'Monday', time: '12:00 PM', subject: 'Graphy Theory', type: 'Lecture', room: 'Room 996' },
      { day: 'Monday', time: '1:00 PM', subject: 'Mobile App Dev', type: 'Lecture', room: 'Room 996' },
      { day: 'Monday', time: '3:00 PM', subject: 'Adv. Data Centric Web App', type: 'Lecture', room: 'Room 996' },
      { day: 'Monday', time: '4:00 PM', subject: 'Database Mgmt Systems', type: 'Practical', room: 'Room 304' },
      { day: 'Tuesday', time: '9:00 AM', subject: 'Software Testing', type: 'Practical', room: 'Room 479' },
      { day: 'Tuesday', time: '11:00 PM', subject: 'Graphy Theory', type: 'Practical', room: 'Room 470' },
      { day: 'Tuesday', time: '1:00 PM', subject: 'Mobile App Dev', type: 'Lecture', room: 'Room 1039' },
      { day: 'Wednesday', time: '9:00 AM', subject: 'PPIT', type: 'Lecture', room: 'Room 208' },
      { day: 'Wednesday', time: '11:00 AM', subject: 'Graphy Theory', type: 'Lecture', room: 'Room 208' },
      { day: 'Wednesday', time: '12:00 PM', subject: 'PPIT', type: 'Lecture', room: 'Room 996' },
      { day: 'Wednesday', time: '1:00 PM', subject: 'Database Mgmt Systems', type: 'Lecture', room: 'Room 996' },
      { day: 'Wednesday', time: '3:00 PM', subject: 'Software Testing', type: 'Lecture', room: 'Room 939' },
      { day: 'Wednesday', time: '4:00 PM', subject: 'PPIT', type: 'Practical', room: 'Room 470' },
      { day: 'Thursday', time: '12:00 PM', subject: 'Mobile App Dev', type: 'Practical', room: 'Room 470' },
      { day: 'Thursday', time: '3:00 PM', subject: 'Adv. Data Centric Webp App', type: 'Practical', room: 'Room 483' }
    ]
  };

  displayedTimetable: TimetableEntry[] = [];

  constructor() {}

  ngOnInit() {
    this.switchGroup(this.currentGroup);
  }

  switchGroup(group: string) {
    this.currentGroup = group;
    this.displayedTimetable = this.timetable[group];
  }
}
