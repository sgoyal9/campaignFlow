import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipientSelectDashboardComponent } from './recipient-select-dashboard.component';

describe('RecipientSelectDashboardComponent', () => {
  let component: RecipientSelectDashboardComponent;
  let fixture: ComponentFixture<RecipientSelectDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecipientSelectDashboardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipientSelectDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
