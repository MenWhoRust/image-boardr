import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SearchTerms} from '../../types/SearchTerms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  @Input()
  searchTerms: SearchTerms;

  @Output()
  ratingChange = new EventEmitter<SearchTerms>();

  isSafe: boolean;
  isQuestionable: boolean;
  isExplicit: boolean;
  tags: string;
  pageSize: number;

  constructor() {

  }

  ngOnInit() {
    this.isSafe = this.searchTerms.isSafe;
    this.isQuestionable = this.searchTerms.isQuestionable;
    this.isExplicit = this.searchTerms.isExplicit;
    this.tags = this.searchTerms.tags;
    this.pageSize = this.searchTerms.pageSize;
  }

  submitSearch() {
    this.ratingChange.emit(new SearchTerms(this.tags, this.pageSize, this.isSafe, this.isQuestionable, this.isExplicit));
  }
}
