import { Component, OnInit } from '@angular/core';
import StickyNavigation from './stickynavbar.component.js';

@Component({
  selector: 'app-ourfaculty',
  templateUrl: './ourfaculty.component.html',
  styleUrls: ['./ourfaculty.component.css']
})
export class OurfacultyComponent implements OnInit {

  stickyNavigation: StickyNavigation | undefined;
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  ngAfterViewInit() {
    this.stickyNavigation = new StickyNavigation();

}
}
