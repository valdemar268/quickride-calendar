import { Component, OnInit, ViewChild, Renderer2, ElementRef, ChangeDetectorRef } from '@angular/core';

import { CalendarComponent as calendar} from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { EventService } from '../services/events.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  calendarOptions: Options;
  config: Options = {};
  displayEvent: any;
  view: string = 'agendaWeek';
  date = { };
  selectedEvents;
  events;
  drivers;

  @ViewChild(calendar) ucCalendar: calendar;

  constructor(protected eventService: EventService,
              private route: ActivatedRoute,
              private renderer: Renderer2, 
              private el: ElementRef,
              private changeDetectionRef: ChangeDetectorRef
            ) {}

  ngOnInit() {
    this.subscribeOnRouteParamsChanges()
  }

  subscribeOnRouteParamsChanges(): void  {
    this.route.params.subscribe( (params) => {
      this.view = params.view
      this.getEvents();
      if (this.view) {
        setTimeout( () =>  this.switchView({view: this.view}), 500);
        setTimeout( () =>  this.setCustomConfig(), 500);
      }
    });
  }

  getEvents(): void  {
    this.eventService.getDrivers().subscribe( (data) => {
      this.drivers = data;
      this.eventService.getEvents().subscribe( (data) => {
        this.events = data;
        this.filterEventsByDrivers(this.drivers);
        this.initCalendar();
      });
    })
  }

  filterEventsByDrivers(drivers): void {
    this.selectedEvents = this.events.filter( (event) => {
      return drivers.some((driver) => event.driverId === driver.id);
    });
  }

  initCalendar(): void  {
    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      nowIndicator: true,
      height: 620,
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
      defaultView: this.config.defaultView || 'agendaDay',
      columnFormat: 'ddd D',
      titleFormat: 'MMMM Y',
      events: this.selectedEvents,
    };
  }

  setCustomConfig(): void  {
      this.addNowIndicatorTimeLabel();
      this.getMonthAndYear();
  }
 
  addNowIndicatorTimeLabel(): void  {
    const calendar = this.ucCalendar['element'].nativeElement;
    const indicator = calendar.getElementsByClassName('fc-now-indicator-line')[0];
    const date = new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
    if (indicator) {
      indicator.setAttribute('data-time', date);
    }
  }

  getMonthAndYear(): void {
    const calendar = this.ucCalendar['element'].nativeElement;
    const monthYear = calendar.getElementsByClassName('fc-center')[0];
    const year = monthYear.textContent.slice(monthYear.textContent.length-4);
    const month = monthYear.textContent.slice(0, monthYear.textContent.length-5);
    this.date = {year, month};
  }

  switchView({ view }): void  {
    this.view = view;
    this.ucCalendar.fullCalendar('changeView', view);
  }

  switchData({ direction }): void  {
    this.ucCalendar.fullCalendar(direction);
  }

  switchDrivers({ drivers }): void  {
    this.filterEventsByDrivers(drivers);
    console.log(this.selectedEvents);
    this.ucCalendar.fullCalendar({events: this.selectedEvents});
    // this.initCalendar();
  }

  eventAfterRender(event): void {
    this.setCustomConfig();
  }
}
