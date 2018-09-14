import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChatgroupRootComponent } from './new-chatgroup-root.component';

describe('NewChatgroupRootComponent', () => {
  let component: NewChatgroupRootComponent;
  let fixture: ComponentFixture<NewChatgroupRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewChatgroupRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewChatgroupRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
