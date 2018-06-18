import _ from 'lodash';
import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild, ViewContainerRef
} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {KonachanPost} from '../../types/Konachan';
import {ConfirmMessageComponent} from '../confirm-message/confirm-message.component';

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
      state('false', style({width: 0})),
      transition('false <=> true', [
        animate(500)
      ])
    ]),
    trigger('infoAnim', [
      state('false', style({opacity: 0})),
      transition('false <=> true', [
        animate(250)
      ])
    ])
  ]
})

export class LightboxComponent implements OnInit {

  @ViewChild('infoBtn')
  infoBtn: ElementRef;

  @ViewChild('lightbox', {read: ViewContainerRef})
  container: ViewContainerRef;

  @ViewChild('tagsContainer')
  tagsContainer: ElementRef;



  @Output() destroyCheck: EventEmitter<string> = new EventEmitter<string>();
  @Output() tagClicked: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  index: number;

  @Input()
  posts: KonachanPost[];

  isLoaded = false;
  isInfoOpen = false;
  infoTagAnimTrigger = false;

  active = false;

  constructor(private electron: ElectronService, private resolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
  }

  loaded() {
    this.isLoaded = !this.isLoaded;
  }

  handleAnimationState(event) {
    switch (event.triggerName) {
      case 'lightboxAnimate':
        if (event.fromState === 'void' && event.phaseName === 'done') {
          this.active = true;
        }

        if (event.fromState === true && event.toState === false && event.phaseName === 'done') {
          this.destroyCheck.emit();
        }
        break;

      case 'infoOpen':
        if (event.fromState === false && event.phaseName === 'done' && event.toState === true) {
          this.infoTagAnimTrigger = true;
        }
        if (event.fromState === true && event.phaseName === 'start' && event.toState === false) {
          this.infoTagAnimTrigger = false;
        }
        break;

    }
  }

  toggleInfo(event) {
    if (this.infoBtn.nativeElement.contains(event.target)) {
      this.isInfoOpen = !this.isInfoOpen;
    } else if (this.tagsContainer.nativeElement.contains(event.target)) {
      return;
    } else {
      this.isInfoOpen = false;
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

  confirmOpenUrl(url: string) {
    this.isInfoOpen = false;
    const factory: ComponentFactory<ConfirmMessageComponent> = this.resolver.resolveComponentFactory(ConfirmMessageComponent);
    const component: ComponentRef<ConfirmMessageComponent> = this.container.createComponent(factory);
    component.instance.message = {
      messageTitle: 'Are You Sure?',
      messageContent: `Continuing will open a new window in your browser. <br/>Where this link will take you, I don't know.`
    };
    component.instance.isConfirmed.subscribe(e => {
      if (e === true) {
        this.electron.shell.openExternal(url);
      }
      component.destroy();
    });
  }

  closeModal() {
    this.active = false;
  }

  download(fileUrl) {
    this.electron.ipcRenderer.send('download-btn', {url: fileUrl});
  }

  isEscape(event) {
    if (event.keyCode === 27) {
      this.closeModal();
    }
  }

  tagFormatter(tag: string) {
    return tag.replace(new RegExp(/_/g), ' ');
  }

  searchTag(tag) {
    this.tagClicked.emit(tag);
    this.closeModal();
  }

  stopDrag() {
    return false;
  }
}
