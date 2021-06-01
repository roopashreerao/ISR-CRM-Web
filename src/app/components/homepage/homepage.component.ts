import { Component, OnInit } from '@angular/core';
import { BigironISRService } from '../../services/bigiron-isr.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private biISRService: BigironISRService) {
    this.biISRService.getData().subscribe(data => {
      console.log('~~~~~~~~~~~Api called ~~~~~~~~~');
      console.log(data);
    })
  }

  ngOnInit(): void {
  }

}
