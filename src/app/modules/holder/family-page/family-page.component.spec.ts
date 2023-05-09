import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyPageComponent } from './family-page.component';

describe('FamilyPageComponent', () => {
  let component: FamilyPageComponent;
  let fixture: ComponentFixture<FamilyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
