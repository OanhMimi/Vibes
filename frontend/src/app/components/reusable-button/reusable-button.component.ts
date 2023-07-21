import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-reusable-button',
  templateUrl: './reusable-button.component.html',
  styleUrls: ['./reusable-button.component.css']
})
export class ReusableButtonComponent {
  @Input() text!: string;
  @Input() disabled: boolean = false;
  @Output() btnClick = new EventEmitter();

  onBtnClick(){
    this.btnClick.emit();
  }
}
