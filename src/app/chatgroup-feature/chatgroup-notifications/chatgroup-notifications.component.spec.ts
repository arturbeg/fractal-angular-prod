import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatgroupNotificationsComponent } from './chatgroup-notifications.component';

describe('ChatgroupNotificationsComponent', () => {
  let component: ChatgroupNotificationsComponent;
  let fixture: ComponentFixture<ChatgroupNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatgroupNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatgroupNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
