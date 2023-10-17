import {Injectable} from '@angular/core';
import {DayPilot} from 'daypilot-pro-angular';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  resources: DayPilot.ResourceData[] = [
    {
      name: 'Section A', id: 'GA', expanded: true, children: [
        {name: 'Table 1', id: 'T1'},
        {name: 'Table 2', id: 'T2'},
        {name: 'Table 3', id: 'T3'},
        {name: 'Table 4', id: 'T4'},
        {name: 'Table 5', id: 'T5'},
        {name: 'Table 6', id: 'T6'},
      ]
    },
    {
      name: 'Section B', id: 'GB', expanded: true, children: [
        {name: 'Table 7', id: 'T7'},
        {name: 'Table 8', id: 'T8'},
        {name: 'Table 9', id: 'T9'},
        {name: 'Table 10', id: 'T10'},
        {name: 'Table 11', id: 'T11'},
      ]
    }
  ];

  events: DayPilot.EventData[] = [
    {
      id: '1',
      resource: 'T1',
      start: '2023-10-03T12:00:00',
      end: '2023-10-08T15:00:00',
      text: 'Reservation 1',
      tags: {
        backColor: '#e69138',
        description: 'a short description of the events'
      }
    },
    {
      id: '2',
      resource: 'T3',
      start: '2023-10-03T11:00:00',
      end: '2023-10-15T14:00:00',
      text: 'Reservation 2',
      tags: {
        backColor: '#6aa84f',
        description: 'a short description of the events'
      }
    },
    {
      id: '3',
      resource: 'T5',
      start: '2023-10-11T12:00:00',
      end: '2023-10-17T14:00:00',
      text: 'Reservation 3',
      tags: {
        backColor: '#3c78d8',
        description: 'a short description of the events'
      }
    }
  ];

  constructor(private http: HttpClient) {
  }

  getEvents(from: DayPilot.Date, to: DayPilot.Date): Observable<any[]> {

    // simulating an HTTP request
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.events);
      }, 200);
    });

    // return this.http.get("/api/events?from=" + from.toString() + "&to=" + to.toString());
  }

  getResources(): Observable<any[]> {

    // simulating an HTTP request
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.resources);
      }, 200);
    });

    // return this.http.get("/api/resources");
  }

}
