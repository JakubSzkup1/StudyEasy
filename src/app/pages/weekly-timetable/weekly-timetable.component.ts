import { Component, OnInit } from '@angular/core';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { TimetableService,Timetable } from 'src/app/services/timetable.service';



@Component({
  selector: 'app-weekly-timetable',
  templateUrl: './weekly-timetable.component.html',
  styleUrls: ['./weekly-timetable.component.scss'],
})
export class WeeklyTimetableComponent implements OnInit {
  timetables: Timetable[] = [];
  selectedTimetable: Timetable = {
    id: 0,
    day: "",
    time: "",
    subject: ""
  };
  hasSelectedTimetable: boolean = false;

  constructor(private timetableService: TimetableService) { }

  ngOnInit(): void {
    this.loadTimetables();
  }

  loadTimetables(): void {
    this.timetableService.getTimetables().subscribe(timetables => {
      this.timetables = timetables;
    });
  }

  selectTimetable(timetable: Timetable): void {
    this.hasSelectedTimetable = true;
    this.selectedTimetable = { ...timetable }; // Copy the selected timetable
  }

  deleteTimetable(id: number): void {
    this.timetableService.deleteTimetable(id).subscribe(() => {
      this.loadTimetables();
      this.selectedTimetable = { id: 0, day: "", time: "", subject: "" }; // Reset selected timetable
      this.hasSelectedTimetable = false;
    });
  }

  saveTimetable(): void {
    if (this.hasSelectedTimetable) {
      this.updateTimetable();
    } else {
      this.addTimetable();
    }
  }

  addTimetable(): void {
    this.timetableService.addTimetable(this.selectedTimetable).subscribe(() => {
      this.loadTimetables();
      this.selectedTimetable = { id: 0, day: "", time: "", subject: "" }; // Reset selected timetable
    });
  }

  updateTimetable(): void {
    this.timetableService.updateTimetable(this.selectedTimetable).subscribe(() => {
      this.loadTimetables();
      this.selectedTimetable = { id: 0, day: "", time: "", subject: "" }; // Reset selected timetable
      this.hasSelectedTimetable = false;
    });
  }
}
