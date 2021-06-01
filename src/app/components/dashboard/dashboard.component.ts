import { Component, OnInit } from '@angular/core';
import { BigironISRService } from '../../services/bigiron-isr.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: []
})
export class DashboardComponent implements OnInit {

  constructor(private isrService : BigironISRService) { }

  public counties;
  ngOnInit(): void {

  }

}

