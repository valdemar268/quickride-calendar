import { Component, OnInit, ViewChild, Renderer2, ElementRef, AfterViewChecked } from '@angular/core';

import { CalendarComponent as calendar} from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { EventService } from './services/events.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, AfterViewChecked {

  calendarOptions: Options;
  displayEvent: any;
  period: string = 'day';
  selectedDrivers;
  drivers;

  @ViewChild(calendar) ucCalendar: calendar;

  constructor(protected eventService: EventService,
              private route: ActivatedRoute,
              private renderer: Renderer2, 
              private el: ElementRef
            ) { }

  ngOnInit() {
    console.log('data-------ng')
    console.log( );
    this.initCalendar();

    this.route.params.subscribe( (params) => {
      this.period = params.period
      this.initCalendar();
    });
  }

  ngAfterViewChecked() {
    setTimeout( () => this.addNowIndicatorTimeLabel(), 0);
  }

  initCalendar() {
    this.eventService.getEvents().subscribe( (data) => {
      this.calendarOptions = {

        height: 508,
        editable: true,
        eventLimit: false,
        nowIndicator: true,
        header: {
          right: '',
          center: 'prev,next title',
          left: 'month,agendaWeek,agendaDay,listMonth'
        },
        views: {
          basic: {
            // options apply to basicWeek and basicDay views
          },
          agenda: {
            // options apply to agendaWeek and agendaDay views
          },
          week: {
            displayEventTime: false,
            displayEventEnd: false
            // options apply to basicWeek and agendaWeek views
          },
          day: {
            timeFormat: 'h:mm A',
            displayEventEnd: false
            // options apply to basicDay and agendaDay views
          }
        },
        defaultView: 'agenda' + this.period[0].toUpperCase() + this.period.slice(1),
        columnFormat: 'ddd D',
        titleFormat: 'MMMM Y',
        events: data,
      };
    });

    this.eventService.getDrivers().subscribe( (data) => {
      console.log(data);
      this.drivers = data;
    })
  }

  addNowIndicatorTimeLabel() {
    const calendar = this.ucCalendar['element'].nativeElement;
    const indicator = calendar.getElementsByClassName('fc-now-indicator-line')[0];
    console.log(indicator)
    const date = new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
    indicator.setAttribute('data-time', date);
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

  filterAll(data) {
    return data;
  }

}
