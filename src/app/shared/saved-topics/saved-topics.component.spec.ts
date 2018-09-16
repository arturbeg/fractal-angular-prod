import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedTopicsComponent } from './saved-topics.component';

describe('SavedTopicsComponent', () => {
  let component: SavedTopicsComponent;
  let fixture: ComponentFixture<SavedTopicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedTopicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
