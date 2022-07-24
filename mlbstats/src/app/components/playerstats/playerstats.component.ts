import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-playerstats',
  templateUrl: './playerstats.component.html',
  styleUrls: ['./playerstats.component.css']
})
export class PlayerstatsComponent implements OnInit {

  @Input() cols!: string[];
  @Input() stats!: string[];

  constructor() { }

  ngOnInit(): void {}

}
