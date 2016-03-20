declare module "ds-toast/services/ds-toast-service" {
    import { Subject } from 'rxjs/Subject';
    export class Toast {
        private text;
        private mood;
        private title;
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
        success(_text: string, _title?: string): void;
        warn(_text: string, _title?: string): void;
        info(_text: string, _title?: string): void;
        addToast(_text: string, _mood: string, _title?: string): void;
        earlyRemove(): void;
        clearToast(_toast: Toast): number;
    }
}
declare module "ds-toast/toasts/ds-toast-basic" {
    export class DsToastBasic {
        config: {};
        constructor();
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
