import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[ClickOutside]'
})
export class ClickOutsideDirective {

  @Output() public clickOutside = new EventEmitter();
  constructor(private _elementRef: ElementRef) { }

  @HostListener('document:click', ['$event'])
  public onClick(targetElement) {
    const isClickedInside = this._elementRef.nativeElement.contains(targetElement.target);
    if (!isClickedInside) {
      this.clickOutside.emit(targetElement);
    }
  }

}
