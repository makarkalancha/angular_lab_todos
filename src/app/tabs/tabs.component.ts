import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  @Input() tabIndex:number = 0;//readonly
  @Output() tabChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  selectTab(index: number){
    this.tabIndex = index;
    this.tabChange.emit(this.tabIndex);
  }


}
