import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

declare let webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root',
})
export class VoiceRecognitionService {
  recognition: any;
  isStopped = false;
  public text = '';
  private voiceToTextSubject: Subject<string> = new Subject();
  private speakingPaused: Subject<any> = new Subject();
  private newWords: string = '';
  constructor() {}

  speechInput() {
    return this.voiceToTextSubject.asObservable();
  }

  startAgain() {
    if (!this.recognition.isActive) {
      this.recognition.start();
      this.recognition.lastActive = Date.now();
    }
  }

  init(lang: string) {
    this.recognition = new webkitSpeechRecognition();
    this.recognition.interimResults = true;
    this.recognition.lang = lang;

    this.recognition.addEventListener('result', (e: any) => {
      this.newWords = Array.from(e.results)
        .map(([result]: any) => result.transcript)
        .join('');
      this.voiceToTextSubject.next(this.text || this.newWords);
    });

    return this.initListeners();
  }

  initListeners() {
    this.recognition.addEventListener('end', () => {
      this.recognition.stop();
    });

    return this.speakingPaused.asObservable();
  }

  start(lang: string) {
    this.recognition.lang = lang;
    this.isStopped = false;
    this.recognition.start();

    this.recognition.addEventListener('end', () => {
      if (this.isStopped) {
        this.recognition.isActive = true;
        this.recognition.stop();
      } else {
        this.isStopped = false;
        this.wordConcat();
        this.startAgain();
      }
    });
  }

  stop() {
    this.isStopped = true;
    this.wordConcat();
    this.recognition.stop();
    this.recognition.isActive = false;
    this.speakingPaused.next('Stopped speaking');
  }

  wordConcat() {
    this.text = `${this.text.trim()} ${this.newWords}`.trim();
    this.newWords = '';
    this.voiceToTextSubject.next(this.text);
  }
}
