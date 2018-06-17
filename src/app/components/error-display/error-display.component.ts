import {Component, Input, OnInit} from '@angular/core';
import {IErrorMessage} from '../../interfaces/IErrorMessage';

@Component({
  selector: 'app-error-display',
  templateUrl: './error-display.component.html',
  styleUrls: ['./error-display.component.css']
})
export class ErrorDisplayComponent implements OnInit {

  // Holds the error message
  @Input()
  errorMessage: IErrorMessage;

  constructor() { }

  ngOnInit() {
  }

}
