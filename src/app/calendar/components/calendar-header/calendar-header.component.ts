import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { EventService } from '../../services/events.service';

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
  drivers;
  dropdown = false;
  DAY_VIEW = this.views[2].code;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getDrivers().subscribe( (data) => {
      console.log(data);
      this.drivers = data;
    });
  }

  ngOnChanges(): void {
    console.log(this.date);
  }

  switchView(view = 'day'): void {
    this.onSwitchView.emit({ view });
  }

  switchDrivers(drivers = {}): void {
    this.onSwitchDrivers.emit({ drivers });
  }

  switchData(direction = 'next'): void {
    this.onSwitchData.emit({ direction });
  }

  changeDriversList(event): void {
    console.log(event);
  }
  
  toggleDropdown(): void {
    this.dropdown = !this.dropdown;
  }
  
  selectItem(event, i = 0): void {
    console.log(i);
    event.stopPropagation();
    event.stopImmediatePropagation();
    if (i > -1) {
      this.drivers[i].selected = !this.drivers[i].selected
    } else {
      const allSelected = this.getSelectedDrivers().length === this.drivers.length;
      this.drivers.forEach((driver) => driver.selected = !allSelected);
    }
    this.onSwitchDrivers.emit({ drivers: this.getSelectedDrivers()});
  }

  getSelectedDrivers(): Array<Object> {
    return this.drivers.filter( (item) => item.selected);
  }
}
