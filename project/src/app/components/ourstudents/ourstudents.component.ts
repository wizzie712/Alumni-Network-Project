import { Component, OnInit } from '@angular/core';
import StickyNavigation from './stickynavbar.component.js';

@Component({
  selector: 'app-ourstudents',
  templateUrl: './ourstudents.component.html',
  styleUrls: ['./ourstudents.component.css']
})
export class OurstudentsComponent implements OnInit {

  stickyNavigation: StickyNavigation | undefined;
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  ngAfterViewInit() {
    this.stickyNavigation = new StickyNavigation();

}
}
