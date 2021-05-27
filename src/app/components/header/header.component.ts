import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

@Component({
  selector: 'header-prefix',
  template: '<ng-content></ng-content>',
  styleUrls: ['./header.component.scss'],
  host: {
    class: 'header-prefix',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class HeaderPrefixComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

@Component({
  selector: 'header-title',
  template: '<ng-content></ng-content>',
  styleUrls: ['./header.component.scss'],
  host: {
    class: 'header-title',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class HeaderTitleComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

@Component({
  selector: 'header-suffix',
  template: '<ng-content></ng-content>',
  styleUrls: ['./header.component.scss'],
  host: {
    class: 'header-suffix',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class HeaderSuffixComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
