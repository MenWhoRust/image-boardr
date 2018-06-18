import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IMessage} from '../../interfaces/IMessage';

@Component({
  selector: 'app-confirm-message',
  templateUrl: './confirm-message.component.html',
  styleUrls: ['./confirm-message.component.css']
})
export class ConfirmMessageComponent implements OnInit {

  log(st) {
    console.log(st);
  }

  @Input()
  message: IMessage;

  @Output()
  isConfirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  messageResult(isConfirmed: boolean) {
    this.isConfirmed.emit(isConfirmed);
  }

}
