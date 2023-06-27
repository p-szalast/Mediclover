import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'as-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent {
  @Input()
  id!: string;

  @Input()
  placeholder?: string;

  // MY NOTES: NON REACTIVE FORMS:
  // @Output()
  // valueChanged = new EventEmitter<string>();

  // valueChange(event: Event) {
  //   this.valueChanged.emit((event.target as HTMLInputElement).value);
  // }
}
