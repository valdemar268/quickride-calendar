import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar-view/calendar.component';

const DEFAULT_CALENDAR_VIEW = 'agendaWeek';

const routes: Routes = [
  { path: '', redirectTo: DEFAULT_CALENDAR_VIEW, pathMatch: 'full' },
  { path: ':view', component: CalendarComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }