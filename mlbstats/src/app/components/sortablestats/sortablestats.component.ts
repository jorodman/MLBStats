import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sortablestats',
  templateUrl: './sortablestats.component.html',
  styleUrls: ['./sortablestats.component.css']
})
export class SortablestatsComponent implements OnInit {

  @Input() cols!: any;
  @Input() players!: any;
  @Output() filter!: EventEmitter<any>;

  constructor() { 
    this.filter = new EventEmitter<any>();
  }

  ngOnInit(): void {
  }

  setFilter(evt: any): void {
    this.filter.emit(evt);
  }

}
