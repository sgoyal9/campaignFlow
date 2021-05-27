import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CreateCampaignService } from 'src/app/services/create-campaign.service';
import { EmailNode, CorrespondenceTime } from 'src/app/models/EmailNode.nodel';
import {
  CampaignTypeEnum,
  CampaignType,
} from 'src/app/models/CampaignTypeEnum.model';
import { MatSidenav } from '@angular/material/sidenav';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-define-campaign-dashboard',
  templateUrl: './define-campaign-dashboard.component.html',
  styleUrls: ['./define-campaign-dashboard.component.scss'],
})
export class DefineCampaignDashboardComponent implements OnInit {
  // Root node for all our nodes
  data: EmailNode;
  // Reference of the current node being edited
  selectedNode: EmailNode;
  // Storing the parent's subject to show in menus
  parentSubject: string;
  // Enum for all our different email types
  campaignTypeEnum = CampaignTypeEnum;
  // Form to select the further email types
  furtherEmailTypesForm: FormGroup;

  // Options for our dropdowns
  selectDayOptions = [...Array(8).keys()].slice(1);
  selectHourOptions = [...Array(24).keys()].slice(1);

  // Form to store all the user input related to the currently edited email
  createEmailForm = new FormGroup({
    date: new FormControl(new Date()),
    time: new FormControl('2:15 pm'),
    subject: new FormControl(),
    body: new FormControl(),
    timeUnit: new FormControl('hours'),
    timeDelay: new FormControl(2),
    sendImmediately: new FormControl(false),
    sendLater: new FormControl(true),
  });

  //Drawer reference to control it programatically
  @ViewChild('createEmailDrawer') createEmailDrawer: MatSidenav;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public campaignService: CreateCampaignService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createFurtherEmailTypesForm();
  }

  // Add a form array to account for our email types
  private createFurtherEmailTypesForm() {
    this.furtherEmailTypesForm = this.formBuilder.group({
      emailTypes: new FormArray([]),
    });

    this.furtherEmailTypesForm.controls.emailTypes = this.createEmailTypes();
  }

  private createEmailTypes(): FormArray {
    var arr = [];
    for (let i = 0; i < 5; i++) {
      arr.push(new FormControl());
    }
    return new FormArray(arr);
  }

  returnToRecipientSelect() {
    this.router.navigate(['../recipients'], {
      relativeTo: this.activatedRoute,
    });
  }

  // Open the drawer and create a new node if no root
  openCreateEmailDrawer(node?: EmailNode) {
    this.createEmailDrawer.open();

    if (!node) {
      this.data = {
        subject: '',
        body: '',
        type: CampaignTypeEnum.DefinedDateTime,
        children: [],
        sendTime: {},
        level: '1',
      };

      this.selectedNode = this.data;

      return;
    }

    this.selectedNode = node;
  }

  // When closing the drawer, we will add data to the selected node
  closeCreateEmailDrawer(shouldAdd: boolean) {
    if (shouldAdd) {
      let correspondenceTime: CorrespondenceTime = {
        fixedDate: null,
        fixedTime: null,
        daysLater: null,
        hoursLater: null,
      };

      this.selectedNode.body = this.createEmailForm.value.body;
      this.selectedNode.subject = this.createEmailForm.value.subject;

      if (this.selectedNode.type == CampaignTypeEnum.DefinedDateTime) {
        correspondenceTime.fixedDate = this.createEmailForm.value.date;
        correspondenceTime.fixedTime = this.createEmailForm.value.time;
      } else if (
        this.selectedNode.type == CampaignTypeEnum.NotOpened ||
        this.selectedNode.type == CampaignTypeEnum.OpenedNotClicked ||
        this.createEmailForm.value.sendLater
      ) {
        if (this.createEmailForm.value.timeUnit == 'hours') {
          correspondenceTime.hoursLater = this.createEmailForm.value.timeDelay;
        } else
          correspondenceTime.daysLater = this.createEmailForm.value.timeDelay;
        correspondenceTime.fixedTime = this.createEmailForm.value.time;
      }
      this.selectedNode.sendTime = correspondenceTime;
    }
    this.resetEmailForm();

    this.createEmailDrawer.close();
  }

  // Reset form to initial status
  private resetEmailForm() {
    this.createEmailForm.controls.date.setValue(new Date());
    this.createEmailForm.controls.time.setValue('2:15 pm');
    this.createEmailForm.controls.timeDelay.setValue(2);
    this.createEmailForm.controls.sendImmediately.setValue(false);
    this.createEmailForm.controls.subject.reset();
    this.createEmailForm.controls.body.reset();
    this.createEmailForm.controls.sendLater.setValue(true);
    this.createEmailForm.controls.timeUnit.setValue('hours');
  }

  changeSendType(event: MatCheckboxChange, formControl: AbstractControl) {
    if (event.checked) formControl.setValue(false);
    else formControl.setValue(true);
  }

  // When the user selects their desired email types, add incomplete children to the parent
  addEmailNode(parentNode: EmailNode) {
    this.selectedNode = parentNode;
    let selectedEmailTypes = (<FormArray>(
      this.furtherEmailTypesForm.controls.emailTypes
    )).controls.flatMap((control, index) => (control.value ? index : []));

    selectedEmailTypes.forEach((type) => {
      let node = {
        subject: '',
        body: '',
        type: type,
        children: [],
        sendTime: {},
        level:
          parentNode.level +
          '_' +
          (parentNode.children?.length ? parentNode.children?.length + 1 : 1),
      };

      parentNode.children.push(node);
    });

    this.furtherEmailTypesForm.reset();
  }

  // Methods to get appropriate text for line items
  getCorrespondenceTime(node: EmailNode): string {
    let text;

    if (
      node.type == CampaignTypeEnum.NotOpened ||
      node.type == CampaignTypeEnum.OpenedNotClicked ||
      (node.sendTime.hoursLater == null &&
        node.sendTime.daysLater == null &&
        node.sendTime.fixedDate == null &&
        node.sendTime.fixedTime == null)
    )
      text = 'immediately';
    else {
      if (node.sendTime.hoursLater)
        text = node.sendTime.hoursLater + ' hours later';
      else {
        let daysLater;

        if (node.sendTime.fixedDate) {
          var diff = Math.abs(
            this.createEmailForm.controls.date.value.getTime() -
              new Date().getTime()
          );
          daysLater = Math.ceil(diff / (1000 * 3600 * 24));
        } else daysLater = this.createEmailForm.controls.timeDelay.value;

        text = daysLater + ' days later at ' + node.sendTime.fixedTime;
      }
    }

    return text;
  }

  getTriggerCondition(node: EmailNode): string {
    let text = 'then send';

    if (
      node.type == CampaignTypeEnum.NotOpened ||
      node.type == CampaignTypeEnum.OpenedNotClicked
    ) {
      if (node.sendTime.daysLater)
        text = 'in ' + node.sendTime.daysLater + ' days, ' + text;
      else if (node.sendTime.hoursLater)
        text = 'after ' + node.sendTime.hoursLater + ' hours, ' + text;
    }
    return text;
  }

  getTypeText(type: CampaignTypeEnum): string {
    return new CampaignType(type).type;
  }

  getEmailIndex(level: string) {
    let text;
    let emailOrder = level.split('_').length;

    switch (emailOrder) {
      case 2:
        text = '2nd';
        break;
      case 3:
        text = '3rd';
        break;
      default:
        text = emailOrder + 1 + 'th';
        break;
    }

    return text;
  }

  // Just a little fun
  congratulations() {
    var count = 2000;
    var defaults = {
      origin: { y: 0.7 },
    };

    function fire(particleRatio, opts) {
      confetti(
        Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio),
        })
      );
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }
}
