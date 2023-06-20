import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-message[firstPlayerIndex]',
  templateUrl: './status-message.component.html',
})
export class StatusMessageComponent {
  @Input() public firstPlayerIndex!: number;
}
