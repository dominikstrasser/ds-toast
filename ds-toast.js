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
                        toastLiveTime: 5000,
                        maxElements: 4,
                        position: 'bottom center'
                    };
                }
                DsToastService.prototype.setConfig = function (_config) {
                    this._config = _config;
                    this.config.next(this._config);
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
                    this._toasts.push(toast);
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
System.register("ds-toast/toasts/ds-toast-basic", ['angular2/core'], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var core_2;
    var DsToastBasic;
    return {
        setters:[
            function (core_2_1) {
                core_2 = core_2_1;
            }],
        execute: function() {
            DsToastBasic = (function () {
                function DsToastBasic() {
                    this.config = {};
                }
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', Object)
                ], DsToastBasic.prototype, "config", void 0);
                DsToastBasic = __decorate([
                    core_2.Component({
                        selector: 'ds-toast-basic',
                        template: "\n    <div class=\"ds-toast-basic\" [ngClass]=config.mood>\n      <h2 class=\"ds-toast-basic__title\">{{config.title}}</h2>\n      <span class=\"ds-toast-basic__text\">{{config.text}}</span>\n    </div>\n  ",
                        styles: ["\n    .ds-toast-basic {\n      padding: 0.5em 1em;\n      margin-bottom: 0.5em;\n      display: inline-block;\n      animation-name: fadeIn;\n      animation-duration: 200ms;\n      animation-fill-mode: forwards;\n      animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);\n    }\n    \n    .ds-toast-basic.fadeOut {\n      animation-name: fadeOut;\n      animation-duration: 200ms;\n      animation-fill-mode: forwards;\n      animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);\n    }\n\n    .ds-toast-basic__title {\n      margin: 0px;\n      padding: 0px;\n      font-size: 1.5em;\n      color: #fff;\n    }\n\n    .ds-toast-basic__text {\n      color: #fff;\n    }\n\n    @keyframes fadeIn {\n      from {\n        transform: translateX(-100px);\n      }\n      to {\n        transform: translateX(0px);\n      }\n    }\n    \n    @keyframes fadeOut {\n      from {\n        transform: translateX(0px);\n        opacity: 1;\n      }\n      to {\n        transform: translateX(-100px);\n        opacity: 0;\n      }\n    }\n\n    .success {\n      background-color: lightgreen;\n    }\n\n    .warn {\n      background-color: crimson;\n    }\n\n    .info {\n      background-color: khaki;\n    }\n  "],
                        providers: [],
                        directives: [],
                        pipes: []
                    }), 
                    __metadata('design:paramtypes', [])
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
    var core_3, ds_toast_service_1, ds_toast_basic_1;
    var DsToast;
    return {
        setters:[
            function (core_3_1) {
                core_3 = core_3_1;
            },
            function (_1) {},
            function (ds_toast_service_1_1) {
                ds_toast_service_1 = ds_toast_service_1_1;
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
                    __metadata('design:paramtypes', [ds_toast_service_1.DsToastService])
                ], DsToast);
                return DsToast;
            }());
            exports_3("DsToast", DsToast);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHMtdG9hc3QuanMiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXMiOlsiZHMtdG9hc3Qvc2VydmljZXMvZHMtdG9hc3Qtc2VydmljZS50cyIsImRzLXRvYXN0L3RvYXN0cy9kcy10b2FzdC1iYXNpYy50cyIsImRzLXRvYXN0L2RzLXRvYXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBS0E7Z0JBQ0UsZUFBb0IsSUFBWSxFQUFVLElBQWEsRUFBVSxLQUFjO29CQUEzRCxTQUFJLEdBQUosSUFBSSxDQUFRO29CQUFVLFNBQUksR0FBSixJQUFJLENBQVM7b0JBQVUsVUFBSyxHQUFMLEtBQUssQ0FBUztnQkFBSSxDQUFDO2dCQUN0RixZQUFDO1lBQUQsQ0FBQyxBQUZELElBRUM7WUFGRCx5QkFFQyxDQUFBO1lBU0Q7Z0JBUUU7b0JBUE8sV0FBTSxHQUFxQixJQUFJLGlCQUFPLEVBQUUsQ0FBQztvQkFDekMsV0FBTSxHQUE0QixJQUFJLGlCQUFPLEVBQUUsQ0FBQztvQkFDaEQsWUFBTyxHQUFpQixFQUFFLENBQUM7b0JBQzNCLFlBQU8sR0FBbUIsSUFBSSxDQUFDO29CQUM5QixrQkFBYSxHQUFVLEVBQUUsQ0FBQztvQkFJaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFFcEIsSUFBSSxDQUFDLE9BQU8sR0FBRzt3QkFDYixhQUFhLEVBQUUsSUFBSTt3QkFDbkIsV0FBVyxFQUFFLENBQUM7d0JBQ2QsUUFBUSxFQUFFLGVBQWU7cUJBQzFCLENBQUE7Z0JBQ0gsQ0FBQztnQkFFRCxrQ0FBUyxHQUFULFVBQVUsT0FBdUI7b0JBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO29CQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2pDLENBQUM7Z0JBRUQsZ0NBQU8sR0FBUCxVQUFRLEtBQWEsRUFBRSxNQUFlO29CQUNwQyxJ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