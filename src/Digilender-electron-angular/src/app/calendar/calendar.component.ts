import * as $ from 'jquery';
import { Component, OnInit, ViewChild } from '@angular/core';
import 'fullcalendar';
import 'fullcalendar-scheduler';
import { ModalService } from '../modal.service';
import { DatabaseService } from '../database.service';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class HomeCalendarComponent implements OnInit {

  constructor(private modalService: ModalService, public db: DatabaseService) { }

  selectedDate: string;
  eventTitle: string;
  eventDescription: string;

  ngOnInit(): void {
    var self = this;
    $(function () {

      var getDaysInMonth = function () {
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        return new Date(year, month, 0).getDate();
      };

      //niet meer nodig door today-functie
      var getMonthDay = function () {
        var d = new Date();
        return d.getDate();
      };

      var getMinTime = function () {
        var time = $('#calendar').fullCalendar('today');
        return time;
      };

      var getMaxTime = function () {
        var days = 7;
        var time = days + ".00:00:00";
        return time;
      };

      // let containerEl: JQuery = $('#calendar');
      $('#calendar').fullCalendar({
        height: $(window).height() * 0.83,
        defaultView: 'agendaWeek',
        groupByResource: true,
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'agendaWeek,family,listThreeDay,month'
        },
        views: {
          listThreeDay: {
            type: 'list',
            duration: {
              days: 31
            }
          },
          family: {
            type: 'agendaDay',
            duration: {
              days: 1
            },
            minTime: getMinTime(),
            maxTime: getMaxTime(),
            slotDuration: '24:00:00',
            slotLabelFormat: 'D MMMM YYYY',
            buttonText: 'family Calendar'
          },
        },
        selectable: false,
        nowIndicator: true,
        allDaySlot: false,
        eventTextColor: 'white',
        // resources: [
        //   { id: '1', title: 'Bram' },
        //   { id: '2', title: 'Tom' },
        //   { id: '3', title: 'Tim' },
        //   { id: '4', title: 'Elke' },
        //   { id: '5', title: 'Mirko' }
        // ],
        events: (start, end, timezone, callback) => {
          self.db.getEvents(undefined).then((events) => {
            callback(events);
          });
        },
        schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
        dayClick: function (date, jsEvent, view) {
          date.utc()

          // alert('Clicked on: ' + date.format());
          // alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
          // alert('Current view: ' + view.name);

          self.selectedDate = date.format();
          self.openModal('Event');

          // $(this).css('background-color', 'red');
        },

        eventRender: function (event, element) {
          if (event.description)
            element.find('.fc-title').after("</br> <span class=\"event-description\">" + event.description + "</span>");
        }
      });
      //werkende optie om overschot onderaan calender weg te halen
      $('#calendar').fullCalendar('option', 'contentHeight', "auto");
    })
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
  
  addEvent() {
    if (this.eventTitle != "" && this.eventTitle != null) {
      this.db.addEvent({id: undefined, UserId: 1, start: this.selectedDate, stop: '', description: this.eventDescription, title: this.eventTitle }).then((newEvent) => {
        console.log('adding event to UI');
        console.log(newEvent);
        console.log($('#calendar'));
        $('#calendar').fullCalendar('renderEvent', {
          title: newEvent.description,
          start: newEvent.startDate,
          allDay: false,
          editable: true,
          description: newEvent.description
        }, true);
      });
      this.closeModal('Event');
      this.eventTitle = "";
      this.eventDescription = "";
    }
  }
}
