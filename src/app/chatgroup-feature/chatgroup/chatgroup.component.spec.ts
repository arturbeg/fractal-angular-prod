import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatgroupComponent } from './chatgroup.component';

describe('ChatgroupComponent', () => {
  let component: ChatgroupComponent;
  let fixture: ComponentFixture<ChatgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
