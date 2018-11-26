import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss']
})
export class CalendarHeaderComponent implements OnInit, OnChanges {

  @Input() date: Date;
  @Input() view: string;
  @Output() onSwitchView = new EventEmitter<any>();
  @Output() onSwitchDrivers = new EventEmitter<any>();
  @Output() onSwitchData = new EventEmitter<any>();

  views = [
    { name: 'Month', code: 'month' },
    { name: 'Week', code: 'agendaWeek' },
    { name: 'Day', code: 'agendaDay' }
  ];

  DAY_VIEW = this.views[2].code;

  constructor() { }

  ngOnInit() {
    console.log(this.date);
  }

  ngOnChanges() {
    console.log(this.date);
  }

  switchView(view = 'day') {
    this.onSwitchView.emit({ view });
  }

  switchDrivers(drivers = {}) {
    this.onSwitchDrivers.emit({ drivers });
  }

  switchData(direction = 'next') {
    this.onSwitchData.emit({ direction });
  }
}
