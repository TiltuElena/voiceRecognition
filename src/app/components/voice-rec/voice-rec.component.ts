import { Component, Input, OnInit } from '@angular/core';
import { VoiceRecognitionService } from '../../services/voice-recognition.service';
import { debounceTime } from 'rxjs';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-voice-rec',
  templateUrl: './voice-rec.component.html',
  styleUrls: ['./voice-rec.component.scss'],
  animations: [
    trigger('smallLarge', [
      state('small', style({
        height: '52px',
        width: '52px',
      })),
      state('large', style({
        height: '80px',
        width: '80px',
      })),
      transition('* => *', [
        animate('550ms 450ms ease-in-out')
      ]),
    ]),
  ]
})
export class VoiceRecComponent implements OnInit {
  @Input() language: any = '';
  start: boolean = false;
  model: string = '';
  subscription: any;
  isTalking: boolean = false;

  constructor(public voiceRec: VoiceRecognitionService) {}

  ngOnInit(): void {
    this.initVoiceInput();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  initVoiceInput() {
    this.subscription = this.voiceRec
      .speechInput()
      .pipe(debounceTime(300))
      .subscribe((input: string) => {
        this.model = input;
        this.voiceRec.isTalking = !this.voiceRec.isTalking;

        if(this.voiceRec.isTalking){
          setTimeout(() => {
            this.voiceRec.isTalking = false;
          }, 500)
        }
      });
  }

  getSpeech() {
    this.start = !this.start;

    if (this.start) {
      this.voiceRec.start(this.language);
    } else {
      this.voiceRec.stopRec();
    }
  }
}
