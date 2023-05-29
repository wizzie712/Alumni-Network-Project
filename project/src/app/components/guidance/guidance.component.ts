import { Component,OnInit,Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import StickyNavigation from './stickynavbar.component.js';

@Component({
  selector: 'app-guidance',
  templateUrl: './guidance.component.html',
  styleUrls: ['./guidance.component.css']
})
export class GuidanceComponent implements OnInit{

  

  stickyNavigation: StickyNavigation | undefined;

  constructor(private router: Router,private renderer: Renderer2) {}
  ngOnInit(): void {
  }


  ngAfterViewInit() {
    this.stickyNavigation = new StickyNavigation();

}



showPopup = false;

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

}

