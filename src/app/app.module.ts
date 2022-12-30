import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VoiceRecComponent } from './components/voice-rec/voice-rec.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, VoiceRecComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
