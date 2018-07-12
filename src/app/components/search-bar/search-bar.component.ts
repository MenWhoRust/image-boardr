import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {SearchTerms} from '../../types/SearchTerms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, OnChanges {

  @Input()
  searchTerms: SearchTerms;

  // Fires when the user submits new search terms
  @Output()
  searchTermsChange = new EventEmitter<SearchTerms>();

  isSafe: boolean;
  isQuestionable: boolean;
  isExplicit: boolean;
  tags: string;
  pageSize: number;

  constructor() {

  }

  // Initialises the search bar with default terms from the parent
  ngOnInit() {
    this.setVariables();
  }

  // Reassigns terms when the value of searchTerms changes
  ngOnChanges(changes: SimpleChanges): void {
   this.ngOnInit();
  }

  setVariables() {
    this.isSafe = this.searchTerms.isSafe;
    this.isQuestionable = this.searchTerms.isQuestionable;
    this.isExplicit = this.searchTerms.isExplicit;
    this.tags = this.searchTerms.tags;
    this.pageSize = this.searchTerms.pageSize;
  }

  // Submits a search when enter is pressed
  checkKeyPress(event) {
    if (event.keyCode === 13) {
      this.submitSearch();
    }
  }

  submitSearch() {
    this.searchTermsChange.emit(new SearchTerms(this.tags, this.pageSize, this.isSafe, this.isQuestionable, this.isExplicit));
  }
}
