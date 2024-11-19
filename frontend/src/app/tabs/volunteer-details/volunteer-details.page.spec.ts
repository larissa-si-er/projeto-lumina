import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VolunteerDetailsPage } from './volunteer-details.page';

describe('VolunteerDetailsPage', () => {
  let component: VolunteerDetailsPage;
  let fixture: ComponentFixture<VolunteerDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
