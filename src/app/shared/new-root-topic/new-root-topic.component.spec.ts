import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRootTopicComponent } from './new-root-topic.component';

describe('NewRootTopicComponent', () => {
  let component: NewRootTopicComponent;
  let fixture: ComponentFixture<NewRootTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRootTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRootTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
