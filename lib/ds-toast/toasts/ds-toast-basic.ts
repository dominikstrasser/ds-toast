import {Component, Input, OnInit} from 'angular2/core';
import { DsToastService, IDsToastConfig, Toast } from '../services/ds-toast-service';

@Component({
  selector: 'ds-toast-basic',
  template: `
    <div class="ds-toast-basic" [ngClass]=[componentClasses]>
      <h2 class="ds-toast-basic__title">{{config.title}}</h2>
      <span class="ds-toast-basic__text">{{config.text}}</span>
    </div>
  `,
  styles: [`
    .ds-toast-basic {
      padding: 0.5em 1em;
      margin-bottom: 0.5em;
      display: inline-block;
    }


    .ds-toast-basic.fadeIn {
      animation-name: fadeIn;
      animation-duration: 400ms;
      animation-fill-mode: forwards;
      animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);  
    }
    
    .ds-toast-basic.fadeOut {
      animation-name: fadeOut;
      animation-duration: 400ms;
      animation-play-state:running;
      animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .ds-toast-basic__title {
      margin: 0px;
      padding: 0px;
      font-size: 1.5em;
      color: #fff;
    }

    .ds-toast-basic__text {
      color: #fff;
    }

    @keyframes fadeIn {
      from {
        transform: translateX(-100px);
      }
      to {
        transform: translateX(0px);
      }
    }
    
    @keyframes fadeOut {
      from {
        height: 100%;
        opacity: 1;
      }
      to {
        height: 0%;
        opacity: 0;
      }
    }

    .success {
      background-color: lightgreen;
    }

    .warn {
      background-color: crimson;
    }

    .info {
      background-color: khaki;
    }
  `],
  providers: [],
  directives: [],
  pipes: []
})
export class DsToastBasic implements OnInit {

  @Input() config: Toast = null;

  private generalConfig: IDsToastConfig = null;
  private componentClasses: string = '';
  private status: string = '';
  constructor(private dsToast: DsToastService) {
    this.generalConfig = dsToast.getConfig()
  }
  
  ngOnChanges (x:any) {
    console.log('CHANGE!')
    console.log(x);
  }

  ngOnInit() {
    console.log('INIT');
    this.status = 'fadeIn';
    this.setComponentClasses();
    setTimeout(() => {
      this.status = 'fadeOut';
      this.setComponentClasses();
    }, this.generalConfig.toastLiveTime - 700);
    
  }
  
  setComponentClasses() {
    this.componentClasses = this.status + ' ' + this.config.mood;
  }

}
