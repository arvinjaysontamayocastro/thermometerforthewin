import { Component, OnInit } from '@angular/core';
import { PageService } from '../_services/page.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public pageService: PageService) {}
  ngOnInit() {
  }
}
