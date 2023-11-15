// Subject
var PaytonEmailNotifer = /** @class */ (function () {
    function PaytonEmailNotifer() {
        this.numEmails = 0;
        this.localEmailApps = [];
    }
    PaytonEmailNotifer.prototype.attach = function (app) {
        var isExist = this.localEmailApps.includes(app);
        if (isExist) {
            return console.log('EmailNotifer: Observer has been attached already.');
        }
        console.log('EmailNotifer: Attached an observer.');
        this.localEmailApps.push(app);
    };
    PaytonEmailNotifer.prototype.detach = function (app) {
        var appIndex = this.localEmailApps.indexOf(app);
        if (appIndex === -1) {
            return console.log('EmailNotifer: Nonexistent observer.');
        }
        this.localEmailApps.splice(appIndex, 1);
        console.log('EmailNotifer: Detached an observer.');
    };
    PaytonEmailNotifer.prototype.notify = function () {
        console.log('EmailNotifer: Notifying local apps...');
        for (var _i = 0, _a = this.localEmailApps; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.update(this);
        }
    };
    PaytonEmailNotifer.prototype.receive = function () {
        var rand = Math.floor(Math.random() * (10 + 1));
        this.numEmails += rand;
        console.log("EmailNotifer: received ".concat(rand, " new emails."));
        this.notify();
    };
    PaytonEmailNotifer.prototype.read = function (num) {
        this.numEmails -= num;
    };
    return PaytonEmailNotifer;
}());
var PhoneEmailApp = /** @class */ (function () {
    function PhoneEmailApp() {
    }
    PhoneEmailApp.prototype.update = function (emialNotifer) {
        if (emialNotifer instanceof PaytonEmailNotifer) {
            console.log('Email App on Phone: You have ' + emialNotifer.numEmails + ' unread messages.');
            if (emialNotifer.numEmails > 20) {
                console.log('Client on Phone: That is a lot, lets read 10 of them.');
                emialNotifer.read(10);
            }
        }
    };
    return PhoneEmailApp;
}());
var ComputerEmailApp = /** @class */ (function () {
    function ComputerEmailApp() {
    }
    ComputerEmailApp.prototype.update = function (emialNotifer) {
        if (emialNotifer instanceof PaytonEmailNotifer) {
            console.log('Email App on Computer: You have ' + emialNotifer.numEmails + ' unread messages.');
        }
    };
    return ComputerEmailApp;
}());
// Client code
var email = new PaytonEmailNotifer();
var phone = new PhoneEmailApp();
email.attach(phone);
var computer = new ComputerEmailApp();
email.attach(computer);
console.log();
email.receive();
console.log();
email.receive();
console.log();
email.receive();
console.log();
email.receive();
console.log();
/* OUTPUT

*/ 
