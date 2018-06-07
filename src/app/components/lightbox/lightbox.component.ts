import _ from 'lodash';
import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer, ViewChild} from '@angular/core';
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
      transition('false <=> true', [
        animate(500)
      ])
    ]),
    trigger('infoOpen', [
      state('true', style({width: '25%'})),
      transition('false <=> true', [
        animate(250)
      ])
    ])
  ]
})

export class LightboxComponent implements OnInit {

  @ViewChild('infoBtn')
  infoBtn: ElementRef;


  @Output() destroyCheck: EventEmitter<string> = new EventEmitter<string>();
  
  @Input()
  index: number;

  @Input()
  posts: Post[];

  isLoaded = false;
  isInfoOpen = false;

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
    console.log(this.infoBtn.nativeElement);
  }

  loaded() {
    this.isLoaded = !this.isLoaded;
  }

  download(fileUrl) {
    this.electron.ipcRenderer.send('download-btn', {url: fileUrl});
  }

  toggleInfo(event) {
    console.log(this.infoBtn);
    if (this.infoBtn.nativeElement.contains(event.target)) {
      this.isInfoOpen = !this.isInfoOpen;
    } else {
      this.isInfoOpen = false;
    }
  }

  closeModal() {
    this.active = false;
  }

  isEscape(event) {
    if (event.keyCode === 27) {
      this.closeModal();
    }
  }

  changePost(direction: string) {
    this.isLoaded = false;
    const debounce = _.debounce(() => {
      console.log('bounce');
      switch (direction) {
        case 'back': {
          if
          (this.index === 0) {
            this.index = this.posts.length - 1;
          } else {
            this.index--;
          }
          break;
        }
        case 'forward': {
          if (this.index === this.posts.length - 1) {
            this.index = 0;
          } else {
            this.index++;
          }
          break;
        }
      }
    }, 500);

    debounce();
  }
}
