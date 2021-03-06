import * as $ from 'jquery';
import { Component, OnInit, ViewChild } from '@angular/core';
import 'fullcalendar';
import 'fullcalendar-scheduler';
import { ModalService } from '../modal.service';
import { DatabaseService } from '../database.service';
import { WifiService } from '../wifi.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {

  constructor(public wservice: WifiService, private modalService: ModalService, public db: DatabaseService, private router: Router, private route: ActivatedRoute) { }
  tdSlotLabel: string;
  tdDay:string;
  addedYear: number;
  days:any[];
  selectedMonth: number;
  months: any[];
  mt: any = new Date();
  tdMonth: string;
  thisYear: string;
  tdTitle: string;
  selectedDate: string;
  dateFromPicker: string;
  eventButton: boolean;
  editBool: boolean;
  selectedStartTime: string;
  selectedEndTime: string;
  eventTitle: string;
  eventDescription: string;
  selectedUserTitle: string;
  selectedEventTitle: string;
  selectedEventDescription: string;
  selectedEventStart: string;
  selectedEventDay: string;
  selectedEventDayNumber: string;
  selectedEventEnd: string;
  calendar;
  users;
  selectedUser;
  userFromDropdown;
  selectedEvent;

  goToOptions(): void {
    this.router.navigate(['/options'], { relativeTo: this.route });
  }

  ngOnInit(): void {
    this.addedYear = 0;
    this.months = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];
    this.tdMonth = this.months[this.mt.getMonth()];
    this.thisYear = this.mt.getFullYear();
    this.tdTitle = '[' + this.tdMonth + " " + this.thisYear + ']';
    this.selectedMonth = this.mt.getMonth();
    this.days = ['Maa','Din','Woe','Don','Vri','Zat','Zon'];
    this.tdDay = this.days[this.mt.getDay()];
    this.tdSlotLabel = '['+this.tdDay.indexOf(this.tdDay)+'\n'+this.tdDay+']';
    this.wservice.init();
    // Selector om de scope te veranderen
    var me = this;
    this.editBool = false;

    $(function () {
      me.calendar = $('#calendar');
      var getDaysInMonth = function () {
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        return new Date(year, month, 0).getDate();
      };
      var lol = escape(me.tdTitle);
      console.log("tis the title of the season " + me.tdTitle);
      // Niet meer nodig door today-functie
      var getMonthDay = function () {
        var d = new Date();
        return d.getDate();
      };

      var getMinTime = function () {
        return { days: -7 };
      };

      var getMaxTime = function () {
        return { days: 30 };
      };

      // let containerEl: JQuery = $('#calendar');
      $('#calendar').fullCalendar({

        //themeSystem: 'bootstrap4',
        height: $(window).height() * 0.95,
        //contentHeight: () => { return $(window).height()*0.8; },
        defaultView: 'family',
        groupByResource: false,
        customButtons: {
          today_custom: {
            text: 'Today',
            click: function () {
              me.addedYear = 0;
              me.selectedMonth = me.months.indexOf(me.tdMonth);
              var tdMonth = me.months[me.selectedMonth];
              var tdYear = me.mt.getFullYear();
              var tdTitle = '[' + tdMonth + " " + tdYear + ']';
              $('#calendar').fullCalendar('today');
              $('#calendar').fullCalendar('option', 'titleFormat', tdTitle)
            }
          },
          myNextButton: {
            text: 'Next',
            icon: 'right-single-arrow',
            click: function () {
              me.selectedMonth++;              
              if(me.selectedMonth == 12){
                me.addedYear++;              
                me.selectedMonth = 0;
              }         
              var tdYear = me.mt.getFullYear()+me.addedYear;
              var tdMonth = me.months[me.selectedMonth];
              var tdTitle = '[' + tdMonth + " " + tdYear + ']';
              $('#calendar').fullCalendar('incrementDate', {
                months: 1
              });
              $('#calendar').fullCalendar('option', 'titleFormat', tdTitle)
            }
          },
          myPrevButton: {

            text: 'Prev',
            icon: 'left-single-arrow',
            click: function () {             
              if(me.selectedMonth == 0){
                me.selectedMonth=11;
                me.addedYear--;              
              }
              else{  
                me.selectedMonth-- 
              }      
              var tdYear = me.mt.getFullYear()+me.addedYear;
              var tdMonth = me.months[me.selectedMonth];
              var tdTitle = '[' + tdMonth + " " + tdYear + ']';
              $('#calendar').fullCalendar('incrementDate', {
                months: -1
              });
              $('#calendar').fullCalendar('option', 'titleFormat', tdTitle)
            }
          }
        },
        header: {
          left: 'today_custom',
          center: 'myPrevButton, title, myNextButton',
          right: ''
        },
        views: {
          family: {
            type: 'agendaDay',
            duration: {
              days: 1
            },
            visibleRange: (current) => {
              return {
                start: current.clone().subtract(7, 'days'),
                end: current.clone().add(1, 'months')
              }
            },
            // how far back you can scroll
            minTime: getMinTime(),
            // how far forwards you can scroll
            maxTime: getMaxTime(),
            slotDuration: '24:00:00',
            titleFormat: `${me.tdTitle}`,
            slotLabelFormat:'D \n ddd',
            buttonText: 'family Calendar',
            scrollTime: { days: 0 }
          },
        },
        slotEventOverlap: false,
        locale: "nl-be",
        timeFormat: 'HH(:mm)',
        displayEventTime: false,
        selectable: false,
        eventOrder: "startActual",
        editable: false,
        allDaySlot: false,
        eventTextColor: 'white',
        // Haal de resources vanuit de database (= users)
        resources: function (callback) {
          console.log("getting resources");
          me.db.getUsers(undefined).then(function (users) {
            console.log("got resources");
            console.log(users);
            callback(users);
            me.users = users;
          })
        },
        // Haal de events uit de database
        events: (start, end, timezone, callback) => {
          me.db.getEvents(undefined).then((events) => {
            events.forEach(element => {
              if (element.start == null) {
                element.start = element.startActual.match(/.*?T/).toString() + "03:00";
              }
            });
            callback(events);
          });
        },
        schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
        // Klik op een lege plek op de kalender
        dayClick: function (date, jsEvent, view, resource) {
          this.selectedEvent = null;
          me.editBool = false;
          me.selectedUser = resource;
          me.selectedUserTitle = resource.title;
          me.dateFromPicker = date.format();
          me.selectedDate = date.format().match(/.*?T/).toString();

          me.db.getUsers(resource.id).then((user) => {
            document.getElementById("event-body").style.backgroundColor = user.eventColor;
            me.openModal('event', true, true);
            document.getElementById("title").click();
          });
        },
        // Voeg een beschrijving toe
        eventRender: function (event, element) {
          if (event.description)
            element.find('.fc-title').after("</br> <span class=\"event-description\">" + event.description + "</span>");
        },
        // Titel bovenaan correct tonen
        viewRender: function (view, element) {
          $('.fc-center')[0].children[1].textContent = view.title.replace(new RegExp("undefined", 'g'), "");
        },
        // Klik op een event en de details tonen
        eventClick: function (calEvent, jsEvent, view) {
          me.editBool = false;
          me.eventButton = false;
          me.selectedEvent = calEvent;
          me.selectedEventTitle = calEvent.title;
          me.selectedEventDescription = calEvent.description;
          me.selectedEventStart = calEvent.startActual.toString().match(/\d{2}:\d{2}/).toString();
          me.selectedEventEnd = calEvent.stop.toString().match(/\d{2}:\d{2}/).toString();
          var d = new Date(calEvent.startActual);
          var days = ["Zon", "Maa", "Din", "Woe", "Don", "Vrij", "Zat"];
          me.selectedEventDay = days[d.getDay()];
          me.selectedEventDayNumber = d.getDate().toString();

          me.db.getUsers(calEvent.resourceId).then((user) => {
            me.selectedUserTitle = user.title;
            document.getElementById("event-detail-body").style.backgroundColor = user.eventColor;
            me.openModal('event-detail', true, false);
            document.getElementById("detail-title").click();
          });
        }
      });
    })
  }

  openModal(id: string, isDatePicked: boolean, startFromNow: boolean) {
    if (!isDatePicked) {
      this.selectedEvent = null;
      this.dateFromPicker = '';
      document.getElementById("event-body").style.backgroundColor = '#f4f1ea';
    }

    this.eventButton = !isDatePicked;

    if (this.selectedEvent != null && !startFromNow) {
      this.eventButton = true;
      document.getElementById("title").textContent = "Evenement aanpassen";
      document.getElementById("add-event-button").textContent = "AANPASSEN";
    }
    else {
      document.getElementById("title").textContent = "Nieuw evenement";
      document.getElementById("add-event-button").textContent = "TOEVOEGEN";
    }

    if (startFromNow) {
      this.selectedEvent = null;
      this.eventTitle = "";
      this.eventDescription = "";
      var currentDate = new Date();
      var currentHour = currentDate.getHours();
      var currentMinute = currentDate.getMinutes();
      this.selectedStartTime = ("0" + currentHour).slice(-2) + ":" + ("0" + currentMinute).slice(-2);
      if (currentHour < 23)
        this.selectedEndTime = ("0" + (currentHour + 1)).slice(-2) + ":" + ("0" + currentMinute).slice(-2);
      else
        this.selectedEndTime = "23:59";
    }

    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  resetCalendar() {
    $('#calendar').fullCalendar('render');
    console.log($('#calendar').fullCalendar('today'));
  }

  updateEndTime() {
    var selectedStartHour = this.selectedStartTime.slice(0, 2);
    var selectedStartMinute = this.selectedStartTime.slice(3);
    if (+selectedStartHour < 23)
      this.selectedEndTime = ("0" + (+selectedStartHour + 1)).slice(-2) + ":" + selectedStartMinute;
    else
      this.selectedEndTime = "23:59";
  }

  addEvent() {
    var eventId = undefined;
    if (this.selectedEvent != null) {
      eventId = this.selectedEvent.id;
      this.userFromDropdown = this.selectedEvent.resourceId;
    }

    if (this.eventButton) {
      var dateFromPicker = new Date(this.dateFromPicker);
      this.selectedDate = dateFromPicker.getFullYear() + "-" + ('0' + (dateFromPicker.getMonth() + 1)).slice(-2) + "-" + ('0' + dateFromPicker.getDate()).slice(-2) + "T";
    }
    else {
      this.userFromDropdown = this.selectedUser.id;
    }

    if (this.eventTitle != "" && this.eventTitle != null && this.dateFromPicker != '') {
      this.db.addEvent({
        id: eventId,
        resourceId: this.userFromDropdown,
        start: null,
        startActual: this.selectedDate + this.selectedStartTime,
        stop: this.selectedDate + this.selectedEndTime,
        description: this.eventDescription,
        title: this.eventTitle
      });
      this.closeModal('event');
      this.eventTitle = "";
      this.eventDescription = "";
      // Alert that there has been a change in the database and refetch the events
      this.db.getEvents(undefined).then(() => {
        this.db.emitChange();
        this.calendar.fullCalendar('refetchEvents');
      });
    }
  }

  deleteEvent() {
    this.db.deleteEvent(this.selectedEvent).then(() => {
      this.db.emitChange();
      this.calendar.fullCalendar('refetchEvents');
      this.closeModal('event-detail');
    });
  }

  editEvent() {
    this.editBool = true;
    this.eventTitle = this.selectedEvent.title;
    this.eventDescription = this.selectedEvent.description;
    this.dateFromPicker = this.selectedEvent.startActual.toString().match(/[^T]*/).toString();
    this.selectedDate = this.dateFromPicker + "T";
    this.selectedStartTime = this.selectedEvent.startActual.toString().match(/[^T]*$/).toString();
    this.selectedEndTime = this.selectedEvent.stop.toString().match(/[^T]*$/).toString();

    this.db.getUsers(this.selectedEvent.resourceId).then((user) => {
      document.getElementById("event-body").style.backgroundColor = user.eventColor;
      this.closeModal('event-detail');
      this.openModal('event', true, false);
    });
  }
}
