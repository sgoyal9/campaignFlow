export enum CampaignTypeEnum {
  Opened,
  NotOpened,
  OpenedClicked,
  OpenedNotClicked,
  DefinedDateTime,
}

export class CampaignType {
  private _type: CampaignTypeEnum;

  constructor(currentType: CampaignTypeEnum) {
    this._type = currentType;
  }

  get type(): string {
    switch (this._type) {
      case CampaignTypeEnum.Opened:
        return 'Opened';
      case CampaignTypeEnum.NotOpened:
        return 'Not Opened';
      case CampaignTypeEnum.OpenedClicked:
        return 'Opened & Clicked';
      case CampaignTypeEnum.OpenedNotClicked:
        return 'Opened & Not Clicked';
      case CampaignTypeEnum.DefinedDateTime:
        return 'Send on defined date & time';
    }
  }
}
