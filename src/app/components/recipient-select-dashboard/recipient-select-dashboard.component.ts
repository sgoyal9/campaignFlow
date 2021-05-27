import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateCampaignService } from 'src/app/services/create-campaign.service';

@Component({
  selector: 'app-recipient-select-dashboard',
  templateUrl: './recipient-select-dashboard.component.html',
  styleUrls: ['./recipient-select-dashboard.component.scss'],
})
export class RecipientSelectDashboardComponent implements OnInit {
  constructor(
    private router: Router,
    public campaignService: CreateCampaignService
  ) {}

  ngOnInit(): void {}

  returnToCampaignDashboard() {
    this.router.navigate(['/campaign']);
  }
}
