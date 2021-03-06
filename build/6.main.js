webpackJsonp([6],{

/***/ 322:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_modal__ = __webpack_require__(376);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginModalModule", function() { return LoginModalModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var LoginModalModule = (function () {
    function LoginModalModule() {
    }
    return LoginModalModule;
}());
LoginModalModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__login_modal__["a" /* LoginModal */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__login_modal__["a" /* LoginModal */]),
            __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["a" /* TranslateModule */].forChild()
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__login_modal__["a" /* LoginModal */]
        ]
    })
], LoginModalModule);

//# sourceMappingURL=login-modal.module.js.map

/***/ }),

/***/ 376:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_wplogin_wplogin__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_device__ = __webpack_require__(37);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginModal; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginModal = (function () {
    function LoginModal(viewCtrl, loadingCtrl, wplogin, events, storage, Device) {
        var _this = this;
        this.viewCtrl = viewCtrl;
        this.loadingCtrl = loadingCtrl;
        this.wplogin = wplogin;
        this.events = events;
        this.storage = storage;
        this.Device = Device;
        this.login = {};
        // login through postmessage sets login_data this way
        events.subscribe('modal:logindata', function (data) {
            _this.setLoginData(data);
        });
        // get login data on first load
        this.storage.get('user_login').then(function (data) {
            if (data) {
                _this.login_data = data;
            }
        });
    }
    LoginModal.prototype.doLogin = function () {
        var _this = this;
        // if in preview, Device.platform is empty object. On device it should be string like 'iOS'
        if (typeof this.Device.platform != 'string') {
            alert('Please try from a device.');
            return;
        }
        if (!this.login)
            alert('Please enter a valid login.');
        this.showSpinner();
        this.wplogin.login(this.login).then(function (response) {
            _this.storage.set('user_login', response.data);
            _this.events.publish('user:login', response.data);
            _this.login_data = response.data;
            _this.dismiss();
            _this.hideSpinner();
        }, function (err) {
            console.log(err);
            _this.hideSpinner();
            var msg = "There was a problem, please try again. ";
            if (err.data && err.data.message)
                msg += err.data.message;
            alert(msg);
        }).catch(function (e) {
            console.warn(e);
            _this.hideSpinner();
            alert("There was a problem connecting to the server.");
        });
    };
    LoginModal.prototype.doLogout = function () {
        var _this = this;
        this.showSpinner();
        this.wplogin.logout().then(function (response) {
            _this.storage.remove('user_login');
            _this.events.publish('user:logout');
            _this.login_data = null;
            _this.dismiss();
            _this.hideSpinner();
        }, function (err) {
            _this.storage.remove('user_login');
            _this.events.publish('user:logout');
            _this.login_data = null;
            _this.hideSpinner();
            console.log(err);
            var msg = "You are logged out of the app, but there was a problem on the server. ";
            if (err.data && err.data.message)
                msg += err.data.message;
            alert(msg);
        }).catch(function (e) {
            console.warn(e);
            _this.hideSpinner();
            alert("There was a problem connecting to the server.");
        });
    };
    LoginModal.prototype.setLoginData = function (data) {
        this.login_data = data;
        console.log('setLoginData', this.login_data);
    };
    LoginModal.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    LoginModal.prototype.showSpinner = function () {
        this.spinner = this.loadingCtrl.create();
        this.spinner.present();
    };
    LoginModal.prototype.hideSpinner = function () {
        this.spinner.dismiss();
    };
    return LoginModal;
}());
LoginModal = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-login-modal',template:/*ion-inline-start:"/Users/macintosh/Documents/devapp/darmo hill android/src/pages/login-modal/login-modal.html"*/'<ion-header>\n\n  <ion-toolbar>\n  \n    <ion-title>{{ \'Login\' | translate }}</ion-title>\n\n    <ion-buttons end>\n      <button ion-button (click)="dismiss()">\n        <ion-icon name="close"></ion-icon>\n      </button>\n    </ion-buttons>\n\n  </ion-toolbar>\n\n</ion-header>\n\n<ion-content>\n\n	<form (ngSubmit)="doLogin()" padding *ngIf="!login_data">\n      <ion-item>\n        <ion-label stacked>{{ \'Username\' | translate }}</ion-label>\n        <ion-input type="text" [(ngModel)]="login.user" name="user" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label stacked>{{ \'Password\' | translate }}</ion-label>\n        <ion-input type="password" [(ngModel)]="login.pass" name="pass" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"></ion-input>\n      </ion-item>\n      \n      <div padding>\n      <button ion-button type="submit" block>{{ \'Submit\' | translate }}</button>\n      </div>\n\n    </form>\n	\n	<div padding *ngIf="login_data">\n		{{login_data.message}}\n    	<button ion-button block (click)="doLogout()">{{ \'Click here to logout\' | translate }}</button>\n    </div>\n\n</ion-content>'/*ion-inline-end:"/Users/macintosh/Documents/devapp/darmo hill android/src/pages/login-modal/login-modal.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_wplogin_wplogin__["a" /* WPlogin */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Events */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_device__["a" /* Device */]])
], LoginModal);

//# sourceMappingURL=login-modal.js.map

/***/ })

});
//# sourceMappingURL=6.main.js.map