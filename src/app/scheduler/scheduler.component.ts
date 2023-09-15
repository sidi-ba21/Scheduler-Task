import { OnInit, Component, ViewChild } from '@angular/core';
import { DayPilot, DayPilotSchedulerComponent } from 'daypilot-pro-angular';
import { DataService } from './data.service';
import ModalClosedArgs = DayPilot.ModalClosedArgs;

@Component({
  selector: 'scheduler-component',
  template: `
    <daypilot-scheduler [config]="config" [events]="events" #scheduler></daypilot-scheduler>
    <div *ngIf="selectedEvent.text" class="event-details">
      <h2> task: {{ selectedEvent.text }}</h2>
      <p> color: <span [style.background]="selectedEvent.tags.backColor">{{ selectedEvent.tags.backColor }}</span></p>
      <p>description: {{ selectedEvent.tags.description }}</p>
    </div>
    <div *ngIf="showEventForm" class="event-form">
      <h2>Create Event</h2>
      <p>
        <input [(ngModel)]="selectedEvent.text" placeholder="Event Name" />
        <input type="color" [(ngModel)]="selectedEvent.tags.backColor"/>
      </p>
      <p>
        <input [(ngModel)]="selectedEvent.tags.description" placeholder="Event Description" />
      </p>
      <button (click)="saveEvent()">Save</button>
    </div>
    `,
  styles: [``]
})
export class SchedulerComponent implements OnInit {

  @ViewChild('scheduler')
  scheduler: DayPilotSchedulerComponent;

  events: DayPilot.EventData[] = [];
  selectedEvent: DayPilot.EventData = {
    start: '',
    end: '',
    id: '',
    resource: '',
    text: '',
    tags: {
      backColor: '',
      description: '',
    }
  };
  showEventForm = false;

  config: DayPilot.SchedulerConfig = {
    timeHeaders: [{ groupBy: 'Month' }, { groupBy: 'Day', format: 'd' }],
    scale: 'Day',
    cellWidth: 50,
    days: DayPilot.Date.today().daysInYear(),
    startDate: DayPilot.Date.today().firstDayOfYear(),
    timeRangeSelectedHandling: 'Enabled',
    onTimeRangeSelected: (args: DayPilot.SchedulerTimeRangeSelectedArgs) => {
      if (this.scheduler && this.scheduler.control) {
        this.selectedEvent = {
          start: args.start.toString(),
          end: args.end.toString(),
          id: DayPilot.guid(),
          resource: args.resource,
          text: '',
          tags: {
            backColor: '',
            description: '',
          }
        };
        this.showEventForm = true;
        this.scheduler.control.clearSelection();
      }
    },
    eventClickHandling: "Enabled",
    onEventClick: (args: DayPilot.SchedulerEventClickArgs) => {
      this.selectedEvent = args.e.data;
      this.showEventForm = true;
    },

    eventMoveHandling: "Update",
    onEventMoved: (args: DayPilot.SchedulerEventMovedArgs) => {
      this.scheduler.control.message('Task moved: ' + args.e.text());
    },

    eventResizeHandling: "Update",
    onEventResized: (args: DayPilot.SchedulerEventResizedArgs) => {
      this.scheduler.control.message('Task resized: ' + args.e.text());
    },

    eventDeleteHandling: 'Update',
    onEventDeleted: (args: DayPilot.SchedulerEventDeletedArgs) => {
      this.scheduler.control.message('Task deleted: ' + args.e.text());
    },
    onBeforeEventRender: (args: DayPilot.SchedulerBeforeEventRenderArgs) => {
      args.data.backColor = (args.data.tags && args.data.tags.backColor) || '#dddddd';
      args.data.borderColor = 'darker';
      args.data.barHidden = false;
      args.data.fontColor = 'white';
    },

    eventHoverHandling: "Bubble",
    bubble: new DayPilot.Bubble({
      onLoad: (args: DayPilot.BubbleLoadArgs) => {
        args.html = 'Event details:' + '<br />' + args.source.data.tags.description;
      }
    }),

    treeEnabled: true,
  };

  constructor(private ds: DataService) {
  }

  ngOnInit(): void {
    this.ds.getResources().subscribe(result => {
      if (this.scheduler && this.scheduler.control) {
        this.config.resources = result;
  
        const from = this.scheduler.control.visibleStart();
        const to = this.scheduler.control.visibleEnd();
  
        this.ds.getEvents(from, to).subscribe(eventResult => {
          this.events = eventResult;
  
          // Scroll to the current month
          const currentDate = DayPilot.Date.today();
          this.scheduler.control.scrollTo(currentDate, 'normal', 'middle');
        });
      }
    });
  }

  saveEvent() {

    // verify by id if exist then update else add
    if (this.selectedEvent.id) {
      const index = this.events.findIndex(e => e.id === this.selectedEvent.id);
      this.events[index] = this.selectedEvent;
    }
    else {
    this.events.push(this.selectedEvent);
    }
    this.showEventForm = false;
  }

}

