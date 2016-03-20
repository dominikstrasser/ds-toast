import {Component} from 'angular2/core';
import 'rxjs/Rx';
import { DsToastService, IDsToastConfig } from './services/ds-toast-service';
import { DsToastBasic } from './toasts/ds-toast-basic';


@Component({
  selector: 'ds-toast',
  providers: [],
  template: `
    <div class="ds-toast" [ngClass]=config.position>
      <div *ngFor="#toast of toasts">
        <ds-toast-basic [config]=toast></ds-toast-basic>
      </div>
    </div>
  `,
  styles: [`
    .ds-toast {
      position: fixed;
      bottom: 1em;
      left: 1em;
      padding: 1em;
      max-height: 300px;
      overflow: scroll;
    }
    
    .left {
      left: 1em;
    }
    
    .right {
      right: 1em;
    }
    
    .bottom {
      bottom: 1em;
    }
    
    .top {
      top: 1em;
    }
    
    .center {
      left: 50%;
      transform: translate3d(-50%, 0, 0);
      text-align: center;
    }
    
  `],
  directives: [DsToastBasic],
  pipes: []
})

export class DsToast {

  private toasts: any[] = [];
  private config: any = {};

  constructor(private dsToast: DsToastService) {

    dsToast.toasts.subscribe((toasts: any[]) => {
      this.toasts = toasts;
    });

    this.config = dsToast._config;
    dsToast.config.subscribe((config: IDsToastConfig) => {
      this.config = config;
    });

  }
}
