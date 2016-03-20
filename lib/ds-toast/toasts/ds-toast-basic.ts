import {Component, Input} from 'angular2/core';


@Component({
  selector: 'ds-toast-basic',
  template: `
    <div class="ds-toast-basic" [ngClass]=config.mood>
      <h2 class="ds-toast-basic__title">{{config.title}}</h2>
      <span class="ds-toast-basic__text">{{config.text}}</span>
    </div>
  `,
  styles: [`
    .ds-toast-basic {
      padding: 0.5em 1em;
      margin-bottom: 0.5em;
      display: inline-block;
      animation-name: fadeIn;
      animation-duration: 200ms;
      animation-fill-mode: forwards;
      animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .ds-toast-basic.fadeOut {
      animation-name: fadeOut;
      animation-duration: 200ms;
      animation-fill-mode: forwards;
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
        transform: translateX(0px);
        opacity: 1;
      }
      to {
        transform: translateX(-100px);
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
export class DsToastBasic {

  @Input() config = {};

  constructor() {}

}
