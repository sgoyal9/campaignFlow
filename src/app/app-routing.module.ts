import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampaignDashboardComponent } from './components/campaign-dashboard/campaign-dashboard.component';
import { RecipientSelectDashboardComponent } from './components/recipient-select-dashboard/recipient-select-dashboard.component';
import { DefineCampaignDashboardComponent } from './components/define-campaign-dashboard/define-campaign-dashboard.component';

const routes: Routes = [
  {
    path: 'campaign',
    children: [
      {
        path: '',
        component: CampaignDashboardComponent,
      },
      {
        path: 'recipients',
        component: RecipientSelectDashboardComponent,
      },
      {
        path: 'define',
        component: DefineCampaignDashboardComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/campaign',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
