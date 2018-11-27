import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class EventService {
    public getEvents(): Observable<any> {
        const dateObj = new Date();
        const yearMonth = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth()+1);
        let data: any = [{
            driverId: 0,
            title: 'All Day Event',
            start: yearMonth + '-01'
        },
        {
            driverId: 1,
            title: 'Long Event',
            start: yearMonth + '-07',
            end: yearMonth + '-10'
        },
        {
            driverId: 0,
            title: 'Repeating Event',
            start: (new Date).toISOString(),
            end: (new Date).toISOString()
        },
        {
            driverId: 0,
            title: 'Repeating Event',
            start: yearMonth + '-26T16:00:00'
        },
        {
            driverId: 1,
            title: 'Conference',
            start: (new Date).toISOString(),
            end: (new Date).toISOString()
        },
        {
            driverId: 3,
            title: 'Meeting',
            start: yearMonth + '-28T10:30:00',
            end: yearMonth + '-28T12:30:00'
        },
        {
            driverId: 3,
            title: 'Lunch',
            start: yearMonth + '-28T12:00:00'
        },
        {
            driverId: 2,
            title: 'Meeting',
            start: yearMonth + '-28T14:30:00'
        },
        {
            driverId: 3,
            title: 'Happy Hour',
            start: yearMonth + '-28T17:30:00'
        },
        {
            driverId: 2,
            title: 'Dinner',
            start: yearMonth + '-28T20:00:00'
        },
        {
            driverId: 1,
            title: 'Birthday Party',
            start: yearMonth + '-29T07:00:00'
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
