import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormControl,
  Validators,
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { CreateCampaignService } from 'src/app/services/create-campaign.service';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Component({
  selector: 'app-campaign-dashboard',
  templateUrl: './campaign-dashboard.component.html',
  styleUrls: ['./campaign-dashboard.component.scss'],
})
export class CampaignDashboardComponent implements OnInit {
  campaignNameForm = new FormControl(
    '',
    [Validators.required],
    [this.campaignNameValidator()]
  );

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public campaignService: CreateCampaignService
  ) {}

  ngOnInit(): void {}

  navigateToSelectRecipients() {
    this.router.navigate(['./recipients'], { relativeTo: this.activatedRoute });
  }

  //Async Validator to check if this campaign name already exists
  checkIfCampaignNameExists(campaignName: string): Observable<boolean> {
    return of(false).pipe(delay(300));
  }

  campaignNameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.checkIfCampaignNameExists(control.value).pipe(
        map((res) => {
          // if res is true, campaignName exists, return true
          return res ? { campaignNameExists: true } : null;
          // NB: Return null if there is no error
        })
      );
    };
  }
}
