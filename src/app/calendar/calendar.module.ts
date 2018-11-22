import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullCalendarModule } from 'ng-fullcalendar';
import { CalendarRoutingModule } from './calendar-routing.module';

import { CalendarComponent } from './calendar.component';
import { LeftBarComponent } from './components/left-bar/left-bar.component';
import { EventService } from './services/events.service';

@NgModule({
  imports: [
    CommonModule,
    CalendarRoutingModule,
    FullCalendarModule
  ],
  declarations: [
    CalendarComponent, 
    LeftBarComponent
  ],
  providers: [ EventService ]
})
export class CalendarModule { }
