import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Post} from '../../types/Konachan';

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
      state('true', style({opacity: 1})),
      transition('false <=> true', [
        animate(500)
      ])
    ])
  ]
})

// TODO: Need to pass the entire posts object to the lightbox rather than a single image to enable navigation
export class LightboxComponent implements OnInit {

  @Output() destroyCheck: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  index: number;

  @Input()
  posts: Post[];

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
    console.log(this.posts);
  }

  download(fileUrl) {
    this.electron.ipcRenderer.send('download-btn', {url: fileUrl});
  }

  closeModal() {
    this.active = false;
  }

  isEscape(event) {
    if (event.keyCode === 27) {
      this.closeModal();
    }
  }
}
