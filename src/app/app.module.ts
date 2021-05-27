import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CampaignDashboardComponent } from './components/campaign-dashboard/campaign-dashboard.component';
import { RecipientSelectDashboardComponent } from './components/recipient-select-dashboard/recipient-select-dashboard.component';
import {
  HeaderComponent,
  HeaderSuffixComponent,
  HeaderTitleComponent,
  HeaderPrefixComponent,
} from './components/header/header.component';
import { DefineCampaignDashboardComponent } from './components/define-campaign-dashboard/define-campaign-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    CampaignDashboardComponent,
    RecipientSelectDashboardComponent,
    DefineCampaignDashboardComponent,
    HeaderComponent,
    HeaderTitleComponent,
    HeaderPrefixComponent,
    HeaderSuffixComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
