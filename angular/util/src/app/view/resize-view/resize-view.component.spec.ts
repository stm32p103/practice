import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResizeViewComponent } from './resize-view.component';

describe('ResizeComponent', () => {
  let component: ResizeViewComponent;
  let fixture: ComponentFixture<ResizeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResizeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResizeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
