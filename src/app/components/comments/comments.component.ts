import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BoardApiService} from '../../services/board-api.service';
import {IKonachanComments} from '../../interfaces/IKonachanComments';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, OnChanges {

  @Input()
  postId: number;

  constructor(private boardApi: BoardApiService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.boardApi.getComments<IKonachanComments[]>(this.postId).then(response => {
        console.log(response);
      }
    );
  }

}
