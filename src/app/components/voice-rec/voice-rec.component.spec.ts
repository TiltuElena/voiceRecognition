import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceRecComponent } from './voice-rec.component';

describe('VoiceRecComponent', () => {
  let component: VoiceRecComponent;
  let fixture: ComponentFixture<VoiceRecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoiceRecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoiceRecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
