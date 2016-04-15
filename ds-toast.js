var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
System.register("ds-toast/services/ds-toast-service", ['angular2/core', 'rxjs/Subject'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, Subject_1;
    var Toast, DsToastService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            }],
        execute: function() {
            Toast = (function () {
                function Toast(text, mood, title) {
                    this.text = text;
                    this.mood = mood;
                    this.title = title;
                }
                return Toast;
            }());
            exports_1("Toast", Toast);
            DsToastService = (function () {
                function DsToastService() {
                    this.toasts = new Subject_1.Subject();
                    this.config = new Subject_1.Subject();
                    this._toasts = [];
                    this._config = null;
                    this.toastTimeOuts = [];
                    console.log('init');
                    this._config = {
                        toastLiveTime: 50000,
                        maxElements: 4,
                        position: 'bottom left'
                    };
                }
                DsToastService.prototype.setConfig = function (_config) {
                    this._config = _config;
                    this.config.next(this._config);
                };
                DsToastService.prototype.getConfig = function () {
                    return this._config;
                };
                DsToastService.prototype.success = function (_text, _title) {
                    this.addToast(_text, 'success', _title);
                };
                DsToastService.prototype.warn = function (_text, _title) {
                    this.addToast(_text, 'warn', _title);
                };
                DsToastService.prototype.info = function (_text, _title) {
                    this.addToast(_text, 'info', _title);
                };
                DsToastService.prototype.addToast = function (_text, _mood, _title) {
                    var toast = new Toast(_text, _mood, _title);
                    this._toasts.unshift(toast);
                    if (this._toasts.length > this._config.maxElements) {
                        this.earlyRemove();
                    }
                    this.toasts.next(this._toasts);
                    this.toastTimeOuts.push(this.clearToast(toast));
                };
                DsToastService.prototype.earlyRemove = function () {
                    clearTimeout(this.toastTimeOuts.shift());
                    this._toasts.shift();
                };
                DsToastService.prototype.clearToast = function (_toast) {
                    var _this = this;
                    return setTimeout(function () {
                        var index = _this._toasts.findIndex(function (d) { return d == _toast; });
                        _this._toasts.splice(index, 1);
                        _this.toasts.next(_this._toasts);
                    }, this._config.toastLiveTime);
                };
                DsToastService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], DsToastService);
                return DsToastService;
            }());
            exports_1("DsToastService", DsToastService);
        }
    }
});
System.register("ds-toast/toasts/ds-toast-basic", ['angular2/core', "ds-toast/services/ds-toast-service"], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var core_2, ds_toast_service_1;
    var DsToastBasic;
    return {
        setters:[
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (ds_toast_service_1_1) {
                ds_toast_service_1 = ds_toast_service_1_1;
            }],
        execute: function() {
            DsToastBasic = (function () {
                function DsToastBasic(dsToast) {
                    this.dsToast = dsToast;
                    this.config = null;
                    this.generalConfig = null;
                    this.componentClasses = '';
                    this.status = '';
                    this.generalConfig = dsToast.getConfig();
                }
                DsToastBasic.prototype.ngOnChanges = function (x) {
                    console.log('CHANGE!');
                    console.log(x);
                };
                DsToastBasic.prototype.ngOnInit = function () {
                    var _this = this;
                    console.log('INIT');
                    this.status = 'fadeIn';
                    this.setComponentClasses();
                    setTimeout(function () {
                        _this.status = 'fadeOut';
                        _this.setComponentClasses();
                    }, this.generalConfig.toastLiveTime - 700);
                };
                DsToastBasic.prototype.setComponentClasses = function () {
                    this.componentClasses = this.status + ' ' + this.config.mood;
                };
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', ds_toast_service_1.Toast)
                ], DsToastBasic.prototype, "config", void 0);
                DsToastBasic = __decorate([
                    core_2.Component({
                        selector: 'ds-toast-basic',
                        template: "\n    <div class=\"ds-toast-basic\" [ngClass]=[componentClasses]>\n      <h2 class=\"ds-toast-basic__title\">{{config.title}}</h2>\n      <span class=\"ds-toast-basic__text\">{{config.text}}</span>\n    </div>\n  ",
                        styles: ["\n    .ds-toast-basic {\n      padding: 0.5em 1em;\n      margin-bottom: 0.5em;\n      display: inline-block;\n    }\n\n\n    .ds-toast-basic.fadeIn {\n      animation-name: fadeIn;\n      animation-duration: 400ms;\n      animation-fill-mode: forwards;\n      animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);  \n    }\n    \n    .ds-toast-basic.fadeOut {\n      animation-name: fadeOut;\n      animation-duration: 400ms;\n      animation-play-state:running;\n      animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);\n    }\n    \n    .ds-toast-basic__title {\n      margin: 0px;\n      padding: 0px;\n      font-size: 1.5em;\n      color: #fff;\n    }\n\n    .ds-toast-basic__text {\n      color: #fff;\n    }\n\n    @keyframes fadeIn {\n      from {\n        transform: translateX(-100px);\n      }\n      to {\n        transform: translateX(0px);\n      }\n    }\n    \n    @keyframes fadeOut {\n      from {\n        height: 100%;\n        opacity: 1;\n      }\n      to {\n        height: 0%;\n        opacity: 0;\n      }\n    }\n\n    .success {\n      background-color: lightgreen;\n    }\n\n    .warn {\n      background-color: crimson;\n    }\n\n    .info {\n      background-color: khaki;\n    }\n  "],
                        providers: [],
                        directives: [],
                        pipes: []
                    }), 
                    __metadata('design:paramtypes', [ds_toast_service_1.DsToastService])
                ], DsToastBasic);
                return DsToastBasic;
            }());
            exports_2("DsToastBasic", DsToastBasic);
        }
    }
});
System.register("ds-toast/ds-toast", ['angular2/core', 'rxjs/Rx', "ds-toast/services/ds-toast-service", "ds-toast/toasts/ds-toast-basic"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var core_3, ds_toast_service_2, ds_toast_basic_1;
    var DsToast;
    return {
        setters:[
            function (core_3_1) {
                core_3 = core_3_1;
            },
            function (_1) {},
            function (ds_toast_service_2_1) {
                ds_toast_service_2 = ds_toast_service_2_1;
            },
            function (ds_toast_basic_1_1) {
                ds_toast_basic_1 = ds_toast_basic_1_1;
            }],
        execute: function() {
            DsToast = (function () {
                function DsToast(dsToast) {
                    var _this = this;
                    this.dsToast = dsToast;
                    this.toasts = [];
                    this.config = {};
                    dsToast.toasts.subscribe(function (toasts) {
                        _this.toasts = toasts;
                    });
                    this.config = dsToast._config;
                    dsToast.config.subscribe(function (config) {
                        _this.config = config;
                    });
                }
                DsToast = __decorate([
                    core_3.Component({
                        selector: 'ds-toast',
                        providers: [],
                        template: "\n    <div class=\"ds-toast\" [ngClass]=config.position>\n      <div *ngFor=\"#toast of toasts\">\n        <ds-toast-basic [config]=toast></ds-toast-basic>\n      </div>\n    </div>\n  ",
                        styles: ["\n    .ds-toast {\n      position: fixed;\n      bottom: 1em;\n      left: 1em;\n      padding: 1em;\n      max-height: 300px;\n      overflow: scroll;\n    }\n    \n    .left {\n      left: 1em;\n    }\n    \n    .right {\n      right: 1em;\n    }\n    \n    .bottom {\n      bottom: 1em;\n    }\n    \n    .top {\n      top: 1em;\n    }\n    \n    .center {\n      left: 50%;\n      transform: translate3d(-50%, 0, 0);\n      text-align: center;\n    }\n    \n  "],
                        directives: [ds_toast_basic_1.DsToastBasic],
                        pipes: []
                    }), 
                    __metadata('design:paramtypes', [ds_toast_service_2.DsToastService])
                ], DsToast);
                return DsToast;
            }());
            exports_3("DsToast", DsToast);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHMtdG9hc3QuanMiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXMiOlsiZHMtdG9hc3Qvc2VydmljZXMvZHMtdG9hc3Qtc2VydmljZS50cyIsImRzLXRvYXN0L3RvYXN0cy9kcy10b2FzdC1iYXNpYy50cyIsImRzLXRvYXN0L2RzLXRvYXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBS0E7Z0JBQ0UsZUFBbUIsSUFBWSxFQUFTLElBQWEsRUFBUyxLQUFjO29CQUF6RCxTQUFJLEdBQUosSUFBSSxDQUFRO29CQUFTLFNBQUksR0FBSixJQUFJLENBQVM7b0JBQVMsVUFBSyxHQUFMLEtBQUssQ0FBUztnQkFBSSxDQUFDO2dCQUNuRixZQUFDO1lBQUQsQ0FBQyxBQUZELElBRUM7WUFGRCx5QkFFQyxDQUFBO1lBU0Q7Z0JBUUU7b0JBUE8sV0FBTSxHQUFxQixJQUFJLGlCQUFPLEVBQUUsQ0FBQztvQkFDekMsV0FBTSxHQUE0QixJQUFJLGlCQUFPLEVBQUUsQ0FBQztvQkFDaEQsWUFBTyxHQUFpQixFQUFFLENBQUM7b0JBQzNCLFlBQU8sR0FBbUIsSUFBSSxDQUFDO29CQUM5QixrQkFBYSxHQUFVLEVBQUUsQ0FBQztvQkFJaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFFcEIsSUFBSSxDQUFDLE9BQU8sR0FBRzt3QkFDYixhQUFhLEVBQUUsS0FBSzt3QkFDcEIsV0FBVyxFQUFFLENBQUM7d0JBQ2QsUUFBUSxFQUFFLGFBQWE7cUJBQ3hCLENBQUE7Z0JBQ0gsQ0FBQztnQkFFRCxrQ0FBUyxHQUFULFVBQVUsT0FBdUI7b0JBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO29CQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2pDLENBQUM7Z0JBRUQsa0NBQVMsR0FBVDtvQkFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLE9B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