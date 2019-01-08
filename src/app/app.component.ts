import { Component, OnDestroy, OnInit } from '@angular/core';
import '../app/modal/modal.scss';
import { fadeAnimation } from './routing-animations';
import { SetupControllerService } from "./setup-controller.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation] // register the animation
})

export class AppComponent implements OnInit {
  constructor(private setupService: SetupControllerService) { }

  otherTheme = false
  ngOnInit() {
    this.setupService.changeThemes.subscribe((isChanged) => {
      this.otherTheme = isChanged
    })
  }


}