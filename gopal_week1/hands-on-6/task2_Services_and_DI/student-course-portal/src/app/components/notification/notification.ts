import { Component } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  providers: [NotificationService],
  template: `
    <section class="notification-panel">
      <h2>Notifications</h2>
      <button type="button" (click)="service.clear()">Clear</button>
      <ul>
        <li *ngFor="let message of service.messages">{{ message }}</li>
      </ul>
    </section>
  `,
})
export class NotificationComponent {
  constructor(public service: NotificationService) {}
}
