import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

declare let webkitSpeechRecognition: any;
declare let SpeechRecognition: any;

@Injectable({
  providedIn: 'root',
})

export class VoiceRecognitionService {
  recognition: any = new webkitSpeechRecognition() || new SpeechRecognition();
  public text = '';
  private voiceToTextSubject: Subject<string> = new Subject();
  private newWords: string = '';
  constructor() {}

  speechInput() {
    return this.voiceToTextSubject.asObservable();
  }

  start(lang: string) {
    this.recognition.interimResults = true;
    this.recognition.continuous = true;
    this.recognition.isActive = true;
    this.recognition.lang = lang;
    this.recognition.start();

    this.recognition.addEventListener('result', (e: any) => {
      this.newWords = Array.from(e.results)
        .map(([result]: any) => result.transcript)
        .join('');
      this.voiceToTextSubject.next( this.text || this.newWords);
    });

    this.recognition.addEventListener('end', () => {
      this.recognition.stop();
      this.recognition.isActive = false
    });
  }

  stop() {
    this.wordConcat();
    this.recognition.stop();
    this.recognition.isActive = false;
  }

  wordConcat() {
    this.text = `${this.text.trim()} ${this.newWords}`.trim();
    this.newWords = '';
    this.voiceToTextSubject.next(this.text);
    this.text = ''
  }
}
