import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { EmailNode } from '../models/EmailNode.nodel';

@Injectable({
  providedIn: 'root',
})
export class CreateCampaignService {
  constructor() {}

  private createdEmailNode$: Subject<EmailNode> = new Subject<EmailNode>();

  sendEmailNode(emailNode: EmailNode) {
    this.createdEmailNode$.next(emailNode);
  }

  getEmailNode(): Observable<EmailNode> {
    return this.createdEmailNode$.asObservable();
  }

  exitMailCampaign() {
    //Exit the mail campaign flow
  }
}
