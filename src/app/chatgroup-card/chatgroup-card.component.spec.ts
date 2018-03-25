import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatgroupCardComponent } from './chatgroup-card.component';

describe('ChatgroupCardComponent', () => {
  let component: ChatgroupCardComponent;
  let fixture: ComponentFixture<ChatgroupCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatgroupCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatgroupCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
