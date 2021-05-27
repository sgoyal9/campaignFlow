import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefineCampaignDashboardComponent } from './define-campaign-dashboard.component';

describe('DefineCampaignDashboardComponent', () => {
  let component: DefineCampaignDashboardComponent;
  let fixture: ComponentFixture<DefineCampaignDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DefineCampaignDashboardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefineCampaignDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
