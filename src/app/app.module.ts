import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from 'ng-fullcalendar';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import localeBE from '@angular/common/locales/nl-BE';
import { MaterialModule } from './material.module';



//componenten
import { AppComponent } from './app.component';
import { HomeCalendarComponent } from './calendar/calendar.component';
import { WeatherComponent } from './weather/weather.component';
import { OptionsComponent } from './options/options.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AuthComponent } from './googleSyncCalendar/auth.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { CalendarListComponent } from './calendar-list/calendar-list.component';
import { WifiComponent } from './wifi/wifi.component';
import { LocatieComponent } from './locatie/locatie.component';
import { ThemaComponent } from './thema/thema.component';
import { SchermComponent } from './scherm/scherm.component';
import { ModalComponent } from './modal/modal.component';

//services
import { WeatherService } from './weather.service';
import { DatabaseService } from './database.service';
import { ModalService } from './modal.service';
import { registerLocaleData } from '@angular/common';
import { StatusPanelComponent } from './status-panel/status-panel.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

registerLocaleData(localeBE, 'nl-BE');
@NgModule({
  declarations: [
    WeatherComponent,
    AppComponent,
    HomeCalendarComponent,
    AuthComponent,
    routingComponents,
    HomeComponent,
    OptionsComponent,
    UsersComponent,
    ModalComponent,
    CalendarListComponent,
    WifiComponent,
    LocatieComponent,
    ThemaComponent,
    SchermComponent,
    StatusPanelComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    AppRoutingModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase, 'Digilender'),
    AngularFirestoreModule, 
    AngularFireAuthModule, 
    AngularFireStorageModule,
    MaterialModule
  ],
  providers: [
    WeatherService,
    DatabaseService,
    ModalService,
    {provide: LOCALE_ID, useValue: "nl-BE"}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
