import {Injectable, EventEmitter} from 'angular2/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';


export class Toast {
  constructor(private text: string, private mood?: string, private title?: string) { }
}

export interface IDsToastConfig {
  position: string,
  maxElements: number,
  toastLiveTime: number
}

@Injectable()
export class DsToastService {
  public toasts: Subject<Toast[]> = new Subject();
  public config: Subject<IDsToastConfig> = new Subject();
  public _toasts: Array<Toast> = [];
  public _config: IDsToastConfig = null;
  private toastTimeOuts: any[] = [];


  constructor() {
    console.log('init');

    this._config = {
      toastLiveTime: 5000,
      maxElements: 4,
      position: 'bottom center'
    }
  }

  setConfig(_config: IDsToastConfig) {
    this._config = _config;
    this.config.next(this._config);
  }

  success(_text: string, _title?: string) {
    this.addToast(_text, 'success', _title);
  }


  warn(_text: string, _title?: string) {
    this.addToast(_text, 'warn', _title);
  }


  info(_text: string, _title?: string) {
    this.addToast(_text, 'info', _title);
  }


  addToast(_text: string, _mood: string, _title?: string) {
    let toast = new Toast(_text, _mood, _title);
    this._toasts.push(toast);

    if (this._toasts.length > this._config.maxElements) {
      this.earlyRemove();
    }

    this.toasts.next(this._toasts);
    this.toastTimeOuts.push(this.clearToast(toast));
  }

  earlyRemove() {
    clearTimeout(this.toastTimeOuts.shift());
    this._toasts.shift();
  }

  clearToast(_toast: Toast) {
    return setTimeout(() => {
      let index = this._toasts.findIndex(d => d == _toast);
      this._toasts.splice(index, 1);
      this.toasts.next(this._toasts);
    }, this._config.toastLiveTime);
  }

}
