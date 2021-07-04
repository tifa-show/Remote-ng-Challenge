import { Component, OnInit } from '@angular/core';
import {ApisService} from "../shared/apis.service";

@Component({
  selector: 'app-riders-list',
  templateUrl: './riders-list.component.html',
  styleUrls: ['./riders-list.component.css']
})
export class RidersListComponent implements OnInit {

  constructor(public api : ApisService) { }

  ngOnInit(): void {
    this.api.getRidersList();


  }

}
