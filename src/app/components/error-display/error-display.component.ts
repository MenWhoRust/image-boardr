import {Component, Input, OnInit} from '@angular/core';
import {IMessage} from '../../interfaces/IMessage';

@Component({
  selector: 'app-error-display',
  templateUrl: './error-display.component.html',
  styleUrls: ['./error-display.component.css']
})
export class ErrorDisplayComponent implements OnInit {

  // Holds the error message
  @Input()
  errorMessage: IMessage;

  constructor() { }

  ngOnInit() {
  }

}
