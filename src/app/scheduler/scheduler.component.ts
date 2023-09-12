import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {DayPilot, DayPilotSchedulerComponent} from 'daypilot-pro-angular';
import {DataService} from './data.service';

@Component({
  selector: 'scheduler-component',
  template: `
    <daypilot-scheduler [config]="config" [events]="events" #scheduler></daypilot-scheduler>
    <div *ngIf="selectedEvent.text" class="event-details">
      <h2> task: {{ selectedEvent.text }}</h2>
      <div [style.backgroundColor]="selectedEvent.backColor" class="event-color"> color:</div>
      <p>description: {{ selectedEvent['description'] }}</p>
    </div>
    <div *ngIf="showEventForm" class="event-form">
      <h2>Create Event</h2>
      <input [(ngModel)]="selectedEvent.text" placeholder="Event Name" />
      <input [(ngModel)]="selectedEvent.backColor" placeholder="Event Color" />
      <input [(ngModel)]="selectedEvent['description']" placeholder="Event Description" />
      <button (click)="saveEvent()">Save</button>
    </div>
  `,
  styles: [`
    .event-details {
      margin-top: 20px;
      padding: 10px;
      border: 1px solid #ccc;
      background-color: #f5f5f5;
    }
    .event-color {
      width: 20px;
      height: 20px;
      display: inline-block;
      margin-right: 5px;
    }
    .event-form {
      margin-top: 20px;
      padding: 10px;
      border: 1px solid #ccc;
      background-color: #f5f5f5;
    }
  `]
})
export class SchedulerComponent implements AfterViewInit {

  @ViewChild('scheduler')
  scheduler!: DayPilotSchedulerComponent;

  events: DayPilot.EventData[] = [];
  selectedEvent: DayPilot.EventData = {
    start: '',
    end: '',
    id: '',
    resource: '',
    text: '',
    backColor: '',
    description: '',
  };
  showEventForm = false;


  config: DayPilot.SchedulerConfig = {
    timeHeaders: [{"groupBy":"Month"},{"groupBy":"Day","format":"d"}],
    scale: "Day",
    days: DayPilot.Date.today().daysInYear(),
    startDate: DayPilot.Date.today().firstDayOfYear(),
    timeRangeSelectedHandling: "Enabled",
    onTimeRangeSelected: (args) => {
      this.selectedEvent = {
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        resource: args.resource,
        text: '',
        backColor: '',
        description: '',
      };
      this.showEventForm = true;
      args.control.clearSelection();
    },

    eventClickHandling: "Enabled",
    onEventClick: (args) => {
      this.selectedEvent = args.e.data;
      this.showEventForm = false;
    },

    eventMoveHandling: "Update",
    onEventMoved: (args) => {
      args.control.message("Event moved: " + args.e.text());
    },
    eventResizeHandling: "Update",
    onEventResized: (args) => {
      args.control.message("Event resized: " + args.e.text());
    },
    eventDeleteHandling: "Update",
    onEventDeleted: (args) => {
      args.control.message("Event deleted: " + args.e.text());
    },
    eventHoverHandling: "Bubble",
    bubble: new DayPilot.Bubble({
      onLoad: (args) => {
        // if event object doesn't specify "bubbleHtml" property 
        // this onLoad handler will be called to provide the bubble HTML
        args.html = "Event details: " + args.source.data.description;
      }
    }),
    treeEnabled: true,
  };

  constructor(private ds: DataService) {
  }

  ngAfterViewInit(): void {
    this.ds.getResources().subscribe(result => this.config.resources = result);

    const from = this.scheduler.control.visibleStart();
    const to = this.scheduler.control.visibleEnd();
    this.ds.getEvents(from, to).subscribe(result => {
      this.events = result;
    });

    // scroll to the current month
    const currentDate = DayPilot.Date.today();

    this.scheduler.control.scrollTo(currentDate, 'normal', 'middle');
  }

  saveEvent() {
    // You can add logic here to save the event data to your backend or update the events array.
    // For example, you can push this.selectedEvent to this.events array.
    this.events.push(this.selectedEvent);
    this.showEventForm = false;
  }
}

