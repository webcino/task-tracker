import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() color: string = 'green';
  @Input() text: string = '';
  @Output() onToggle: EventEmitter<any> = new EventEmitter();

  onClick() {
    this.onToggle.emit();
  }
}
