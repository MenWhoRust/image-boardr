import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../types/IKonachan';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  @Input()
  item: Post[];

  constructor() {
  }

  ngOnInit() {
  }

}
