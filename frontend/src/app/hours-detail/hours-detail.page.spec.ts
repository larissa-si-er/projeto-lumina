import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HoursDetailPage } from './hours-detail.page';

describe('HoursDetailPage', () => {
  let component: HoursDetailPage;
  let fixture: ComponentFixture<HoursDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HoursDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
