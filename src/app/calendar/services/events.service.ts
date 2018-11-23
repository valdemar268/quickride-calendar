import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class EventService {
    public getEvents(): Observable<any> {
        const dateObj = new Date();
        const yearMonth = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
        let data: any = [{
            title: 'All Day Event',
            start: yearMonth + '-01'
        },
        {
            title: 'Long Event',
            start: yearMonth + '-07',
            end: yearMonth + '-10'
        },
        {
            id: 999,
            title: 'Repeating Event',
            start: yearMonth + '-09T16:00:00'
        },
        {
            id: 999,
            title: 'Repeating Event',
            start: yearMonth + '-16T16:00:00'
        },
        {
            title: 'Conference',
            start: yearMonth + '-11',
            end: yearMonth + '-13'
        },
        {
            title: 'Meeting',
            start: yearMonth + '-12T10:30:00',
            end: yearMonth + '-12T12:30:00'
        },
        {
            title: 'Lunch',
            start: yearMonth + '-12T12:00:00'
        },
        {
            title: 'Meeting',
            start: yearMonth + '-12T14:30:00'
        },
        {
            title: 'Happy Hour',
            start: yearMonth + '-12T17:30:00'
        },
        {
            title: 'Dinner',
            start: yearMonth + '-12T20:00:00'
        },
        {
            title: 'Birthday Party',
            start: yearMonth + '-13T07:00:00'
        },
        {
            title: 'Click for Google',
            url: 'http://google.com/',
            start: yearMonth + '-28'
        }];
        return of(data);
    }
    public getDrivers(): Observable<any> {

        let data: any = [{
            id: 0,
            name: 'Robert A.',
            color: '#2694FF',
            job: 'driver'
        },
        {
            id: 1,
            name: 'Jeremy A.',
            color: '#F4641A',
            job: 'driver'
        },
        {
            id: 2,
            name: 'Brian B.',
            color: '#58CB7D',
            job: 'driver'
        },
        {
            id: 3,
            name: 'Adrian L.',
            color: '#E10361',
            job: 'driver'
        }];
        return of(data);
    }
};
