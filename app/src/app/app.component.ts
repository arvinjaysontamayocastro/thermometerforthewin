import { Component, OnInit } from '@angular/core';
import { PageService } from './_services/page.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(public pageService: PageService) {}

  ngOnInit() {
  }
}
