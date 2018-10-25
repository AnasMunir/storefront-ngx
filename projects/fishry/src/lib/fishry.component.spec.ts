import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FishryComponent } from './fishry.component';

describe('FishryComponent', () => {
  let component: FishryComponent;
  let fixture: ComponentFixture<FishryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FishryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FishryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
