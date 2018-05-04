import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.css'],
  animations: [
    trigger('lightboxAnimate', [
      state('void', style({opacity: 0})),
      transition(':enter', [
        animate('250ms ease-in')
      ]),
      transition('true => false', [
        animate('250ms ease-out', style({opacity: 0}))
      ])
    ]),
    trigger('imageFade', [
      state('false', style({opacity: 0})),
      transition('false => true', [
        animate(500)
      ])
    ])
  ]
})
export class LightboxComponent implements OnInit {

  @Output() destroyCheck: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  fileUrl: string;

  @Input()
  tags: string[];

  isLoaded = false;

  active = false;

  handleState(event) {
    if (event.fromState === 'void' && event.phaseName === 'done') {
      this.active = true;
    }

    if (event.fromState === true && event.toState === false && event.phaseName === 'done') {
      this.destroyCheck.emit('kill me');
    }
  }

  constructor(private electron: ElectronService) {
  }

  ngOnInit() {
  }

  loaded() {
    this.isLoaded = !this.isLoaded;
  }

  download(fileUrl) {
    this.electron.ipcRenderer.send('download-btn', {url: fileUrl});
  }

  closeModal() {
    this.active = false;
  }
}
