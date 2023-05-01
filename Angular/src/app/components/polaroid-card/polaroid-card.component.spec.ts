import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolaroidCardComponent } from './polaroid-card.component';

describe('PolaroidCardComponent', () => {
  let component: PolaroidCardComponent;
  let fixture: ComponentFixture<PolaroidCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolaroidCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolaroidCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
