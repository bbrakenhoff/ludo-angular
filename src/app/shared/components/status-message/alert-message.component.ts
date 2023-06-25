import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert-message[title][icon][message][buttonText]',
  templateUrl: './alert-message.component.html',
})
export class AlertMessageComponent {
  @Input()
  public title = '';

  @Input()
  public icon!: 'check-circle' | 'exclamation-circle';

  @Input()
  public message = '';

  @Input()
  public buttonText = '';

  @Output()
  public readonly buttonClick = new EventEmitter<void>();

  public onButtonClick(): void {
    this.buttonClick.emit();
  }
}
