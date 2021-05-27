import { CampaignTypeEnum } from './CampaignTypeEnum.model';

export interface EmailNode {
  level: string;
  type: CampaignTypeEnum;
  subject: string;
  body: string;
  children: EmailNode[];
  sendTime: CorrespondenceTime;
}

export interface CorrespondenceTime {
  fixedDate?: Date;
  fixedTime?: Date;
  daysLater?: number;
  hoursLater?: number;
}
