import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgSelectModule } from '@ng-select/ng-select';
import { FullCalendarModule } from 'ng-fullcalendar';
import { CalendarRoutingModule } from './calendar-routing.module';

import { CalendarComponent } from './calendar-view/calendar.component';
import { LeftBarComponent } from './components/left-bar/left-bar.component';
import { EventService } from './services/events.service';
import { FormsModule } from '@angular/forms';
import { CalendarHeaderComponent } from './components/calendar-header/calendar-header.component';

@NgModule({
  imports: [
    CommonModule,
    CalendarRoutingModule,
    FullCalendarModule,
    NgSelectModule,
    FormsModule
  ],
  declarations: [
    CalendarComponent, 
    LeftBarComponent, 
    CalendarHeaderComponent
  ],
  providers: [ EventService ]
})
export class CalendarModule { }
