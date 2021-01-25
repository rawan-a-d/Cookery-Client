import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

// Blinks title when a notification is received
@Injectable({
  providedIn: 'root'
})
export class TitleBlinkerService {

  private timeout;

  constructor(private title: Title) { }
  
  blink(msg: string, count: number = 10): void {
    const prevTitle = this.title.getTitle();

    const step = () => {
      const newTitle = this.title.getTitle() === prevTitle ?
        msg : prevTitle;

      this.title.setTitle(newTitle);

      if (count) {
        this.timeout = setTimeout(step.bind(this), 1500);
        count--;
      } else {
        this.title.setTitle(prevTitle);
      }
    };

    clearTimeout(this.timeout);
    step();
  }
}
