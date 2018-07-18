import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTopicModalComponent } from './edit-topic-modal.component';

describe('EditTopicModalComponent', () => {
  let component: EditTopicModalComponent;
  let fixture: ComponentFixture<EditTopicModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTopicModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTopicModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
