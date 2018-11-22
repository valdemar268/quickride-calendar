import { Component, OnInit, ViewChild } from '@angular/core';

import { CalendarComponent as calendar} from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { EventService } from './services/events.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  calendarOptions: Options;
  displayEvent: any;
  @ViewChild(CalendarComponent) ucCalendar: calendar;

  constructor(protected eventService: EventService) { }

  ngOnInit() {
    console.log('data-------ng');
    this.eventService.getEvents().subscribe(data => {
      this.calendarOptions = {

        height: 508,
        editable: true,
        eventLimit: false,
        header: {
          right: '',
          center: 'prev,next title',
          left: 'month,agendaWeek,agendaDay,listMonth'
        },
        defaultView: 'agendaWeek',
        columnFormat: 'ddd D',
        titleFormat: 'MMMM Y',
        events: data,
      };
    });
  }
  clickButton(model: any) {
    this.displayEvent = model;
  }
  eventClick(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title,
        allDay: model.event.allDay
        // other params
      },
      duration: {}
    }
    this.displayEvent = model;
  }
  updateEvent(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title
        // other params
      },
      duration: {
        _data: model.duration._data
      }
    }
    this.displayEvent = model;
  }

}
