import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-reusable-button',
  templateUrl: './reusable-button.component.html',
  styleUrls: ['./reusable-button.component.css']
})
export class ReusableButtonComponent {
  @Input() text!: string;
  @Input() disabled: boolean = false;
  @Input() backgroundColor: string = 'var(--primary-color)';
  @Input() hoverColor: string = 'var(--hover-color)';

  isHovering = false;

  @Output() btnClick = new EventEmitter();

  onBtnClick(){
    this.btnClick.emit();
  }
}
