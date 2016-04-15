declare module "ds-toast/services/ds-toast-service" {
    import { Subject } from 'rxjs/Subject';
    export class Toast {
        text: string;
        mood: string;
        title: string;
        constructor(text: string, mood?: string, title?: string);
    }
    export interface IDsToastConfig {
        position: string;
        maxElements: number;
        toastLiveTime: number;
    }
    export class DsToastService {
        toasts: Subject<Toast[]>;
        config: Subject<IDsToastConfig>;
        _toasts: Array<Toast>;
        _config: IDsToastConfig;
        private toastTimeOuts;
        constructor();
        setConfig(_config: IDsToastConfig): void;
        getConfig(): IDsToastConfig;
        success(_text: string, _title?: string): void;
        warn(_text: string, _title?: string): void;
        info(_text: string, _title?: string): void;
        addToast(_text: string, _mood: string, _title?: string): void;
        earlyRemove(): void;
        clearToast(_toast: Toast): number;
    }
}
declare module "ds-toast/toasts/ds-toast-basic" {
    import { OnInit } from 'angular2/core';
    import { DsToastService, Toast } from "ds-toast/services/ds-toast-service";
    export class DsToastBasic implements OnInit {
        private dsToast;
        config: Toast;
        private generalConfig;
        private componentClasses;
        private status;
        constructor(dsToast: DsToastService);
        ngOnChanges(x: any): void;
        ngOnInit(): void;
        setComponentClasses(): void;
    }
}
declare module "ds-toast/ds-toast" {
    import 'rxjs/Rx';
    import { DsToastService } from "ds-toast/services/ds-toast-service";
    export class DsToast {
        private dsToast;
        private toasts;
        private config;
        constructor(dsToast: DsToastService);
    }
}
