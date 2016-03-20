/// <reference path="../ds-toast.d.ts" />
import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {DsToast} from 'ds-toast/ds-toast';
import {DsToastService} from 'ds-toast/services/ds-toast-service';


@Component({
  selector: 'demo-page',
  template: `
    <div>
      <ds-toast></ds-toast>
      <h1>Ds-Toast</h1>
      <button (click)="success()">Success</button>
      <button (click)="warn()">Warn</button>
      <button (click)="info()">Info</button>
    </div>`
  ,
  styleUrls: [],
  providers: [],
  directives: [DsToast],
  pipes: []
})
export class DemoPage {
  
  constructor(private dsToast: DsToastService) { }
  
  success() {
    this.dsToast.success('asdfa sdf asdf asd fas fas fas fas fas df test');
  }

  warn() {
    this.dsToast.warn('test2', 'warning!');
  }

  info() {
    this.dsToast.info('test3');
  }
}



bootstrap(DemoPage, [
  DsToastService
]);
