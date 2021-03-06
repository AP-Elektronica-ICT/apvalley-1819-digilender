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
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

// Componenten
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { WeatherComponent } from './weather/weather.component';
import { OptionsComponent } from './options/options.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AuthComponent } from './googleSyncCalendar/auth.component';
import { UsersComponent, DialogSyncGcalendar } from './users/users.component';
import { CalendarListComponent } from './calendar-list/calendar-list.component';
import { WifiComponent, DialogContentWifi } from './wifi/wifi.component';
import { LocatieComponent } from './locatie/locatie.component';
import { ThemaComponent } from './thema/thema.component';
import { SchermComponent } from './scherm/scherm.component';
import { ModalComponent } from './modal/modal.component';
import { IntroSetupComponent } from './intro-setup/intro-setup.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { NotesComponent } from './notes/notes.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Services
import { WeatherService } from './weather.service';
import { DatabaseService } from './database.service';
import { ModalService } from './modal.service';
import { registerLocaleData } from '@angular/common';
import { StatusPanelComponent } from './status-panel/status-panel.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { GooglePlacesDirective } from './google-places.directive';
import { WifiService } from './wifi.service';
import { SetupControllerService } from "./setup-controller.service";
import { authService } from './auth.service'
import { GoogleCalendarService } from './google-calendar.service'


registerLocaleData(localeBE, 'nl-BE');
@NgModule({
  declarations: [
    WeatherComponent,
    AppComponent,
    CalendarComponent,
    AuthComponent,
    routingComponents,
    OptionsComponent,
    UsersComponent,
    ModalComponent,
    CalendarListComponent,
    WifiComponent,
    LocatieComponent,
    ThemaComponent,
    SchermComponent,
    StatusPanelComponent,
    ToolbarComponent,
    GooglePlacesDirective,
    IntroSetupComponent,
    HomeComponent,
    SettingsComponent,
    NotesComponent,
    DialogContentWifi,
    DialogSyncGcalendar
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
    MaterialModule,
    MatSnackBarModule,
    NgxMaterialTimepickerModule.forRoot()
  ],
  providers: [
    WeatherService,
    DatabaseService,
    ModalService,
    WifiService,
    SetupControllerService,
    authService,
    GoogleCalendarService,
    { provide: LOCALE_ID, useValue: "nl-BE" }
  ],
  entryComponents: [
    CalendarComponent,
    DialogContentWifi,
    DialogSyncGcalendar
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
