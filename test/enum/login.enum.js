"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginPasswords = exports.LoginUsers = exports.LoginError = void 0;
var LoginError;
(function (LoginError) {
    LoginError["Error"] = "Epic sadface: Username and password do not match any user in this service";
    LoginError["lockedUserError"] = "Epic sadface: Sorry, this user has been locked out.";
})(LoginError || (exports.LoginError = LoginError = {}));
var LoginUsers;
(function (LoginUsers) {
    LoginUsers["StandartUser"] = "standard_user";
    LoginUsers["LockedUser"] = "locked_out_user";
})(LoginUsers || (exports.LoginUsers = LoginUsers = {}));
var LoginPasswords;
(function (LoginPasswords) {
    LoginPasswords["Default"] = "secret_sauce";
})(LoginPasswords || (exports.LoginPasswords = LoginPasswords = {}));
