import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertTitleComponent } from './insert-title.component';

describe('InsertTitleComponent', () => {
  let component: InsertTitleComponent;
  let fixture: ComponentFixture<InsertTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertTitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
