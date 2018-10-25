import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FishryImageComponent } from './fishry-image.component';

describe('FishryImageComponent', () => {
  let component: FishryImageComponent;
  let fixture: ComponentFixture<FishryImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FishryImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FishryImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
