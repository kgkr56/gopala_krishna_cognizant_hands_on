import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {
  messages: string[] = [];

  notify(message: string): void {
    this.messages.push(message);
  }

  clear(): void {
    this.messages = [];
  }
}
