import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {

  
  constructor(private modalService:ModalService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }


}
