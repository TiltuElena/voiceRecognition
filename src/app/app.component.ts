import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  title = 'voiceRecognition';
  constructor() {}

  language$: BehaviorSubject<string> = new BehaviorSubject('en-US');

  selectChangeHandler (event: any) {
    this.language$.next(event.target.value);
  }
}
