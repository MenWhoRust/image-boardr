import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Posts} from '../../types/IKonachan';
import {ChangeEvent} from 'angular2-virtual-scroll';

@Component({
  selector: 'app-infinite-list',
  templateUrl: './infinite-list.component.html',
  styleUrls: ['./infinite-list.component.css']
})
export class InfiniteListComponent implements OnChanges {

  constructor() {
  }

  @Input()
  items: Posts[];
  scrollItems: Posts[];

  indices: ChangeEvent;
  buffer: Posts[];
  readonly bufferSize: number = 1;
  loading: boolean;

  ngOnChanges(changes: SimpleChanges) {
    this.reset();
  }

  reset() {
    this.fetchNextChunk(0, this.bufferSize, {}).then(chunk => {
      this.buffer = chunk;
      this.scrollItems = chunk;
    });
  }

  fetchMore(event: ChangeEvent) {
    this.indices = event;
    if (event.end === this.buffer.length) {
      this.loading = true;
      this.fetchNextChunk(this.buffer.length, this.bufferSize, event).then(chunk => {
        console.log('chunk');
        console.log(chunk);

        for (const i of chunk) {
          this.buffer.push(i);
        }
        this.loading = false;
      }, () => this.loading = false);
    }
  }

  fetchNextChunk(skip: number, limit: number, event?: any) {
    return new Promise<Posts[]>((resolve, reject) => {
      if (skip < this.items.length) {
        console.log(this.items.slice(skip, skip + limit));
        return resolve(this.items.slice(skip, skip + limit));
      }
      reject();
    });
  }

}
