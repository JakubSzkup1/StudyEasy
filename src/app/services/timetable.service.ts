import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Timetable {
  id: number;
  day: string;
  time: string;
  subject: string;
}

@Injectable({
  providedIn: 'root'
})
export class TimetableService {
  private apiUrl = 'http://localhost:3000/timetables';

  constructor(private http: HttpClient) { }

  getTimetables(): Observable<Timetable[]> {
    return this.http.get<Timetable[]>(this.apiUrl);
  }

  getTimetableById(id: number): Observable<Timetable> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Timetable>(url);
  }

  addTimetable(timetable: Timetable): Observable<Timetable> {
    return this.http.post<Timetable>(this.apiUrl, timetable);
  }

  updateTimetable(timetable: Timetable): Observable<Timetable> {
    const url = `${this.apiUrl}/${timetable.id}`;
    return this.http.put<Timetable>(url, timetable);
  }

  deleteTimetable(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}