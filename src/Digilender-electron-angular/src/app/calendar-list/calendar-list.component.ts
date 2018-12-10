import * as $ from 'jquery';
import { Component, OnInit, ViewChild } from '@angular/core';
import 'fullcalendar';
import 'fullcalendar-scheduler';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.scss']
})
export class CalendarListComponent implements OnInit {

  constructor(public db: DatabaseService) { }

  ngOnInit(): void {
    var self = this;
    $(function () {
      $('#calendar-list').fullCalendar({
        height: $(window).height() * 0.83,
        defaultView: 'listDay',
        groupByResource: true,
        header: false,
        views: { listDay: {} },
        selectable: false,
        allDaySlot: false,
        listDayFormat: false,
        listDayAltFormat: false,
        noEventsMessage: "There are no events today",
        eventTextColor: 'white',
        events: (start, end, timezone, callback) => {
          self.db.getEvents(undefined).then((events) => {
            callback(events);
          });
        },
        schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
        dayClick: function (date, jsEvent, view) {
          date.utc()
        },
      });

      // Werkende optie om overschot onderaan calender weg te halen
      $('#calendar-list').fullCalendar('option', 'contentHeight', "auto");
    })
  }
}
