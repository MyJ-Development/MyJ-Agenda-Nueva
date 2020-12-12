
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()

export class componentSyncService {

  private messageSource = new BehaviorSubject(new Date());
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: Date) {
    this.messageSource.next(message);
  }

}