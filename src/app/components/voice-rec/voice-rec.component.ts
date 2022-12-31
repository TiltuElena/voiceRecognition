import { Component, Input, OnInit } from '@angular/core';
import { VoiceRecognitionService } from '../../services/voice-recognition.service';
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-voice-rec',
  templateUrl: './voice-rec.component.html',
  styleUrls: ['./voice-rec.component.scss'],
})
export class VoiceRecComponent implements OnInit {
  @Input() language: any = '';
  start: boolean = false;
  model: string = ''
  subscription: any;
  constructor(public voiceRec: VoiceRecognitionService) {}

  ngOnInit(): void {
    this.initVoiceInput();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  initVoiceInput() {
   this.subscription = this.voiceRec.speechInput().pipe(debounceTime(300)).subscribe((input: string) => {
     this.model = input;
    });
  }

  getSpeech() {
    this.start = !this.start;

    if (this.start) {
      this.voiceRec.start(this.language);
    } else {
      this.voiceRec.stop();
    }
  }
}
