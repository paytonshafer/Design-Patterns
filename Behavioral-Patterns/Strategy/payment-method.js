"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var PayWithPayPal = /** @class */ (function () {
    function PayWithPayPal() {
        this.email = '';
        this.password = '';
        this.signedIn = false;
    }
    PayWithPayPal.prototype.collectPaymentDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 6]);
                        _c.label = 1;
                    case 1:
                        if (!!this.signedIn) return [3 /*break*/, 4];
                        console.log('Enter the user\'s email: ');
                        _a = this;
                        return [4 /*yield*/, this.questionAsync('')];
                    case 2:
                        _a.email = _c.sent();
                        console.log('Enter the password: ');
                        _b = this;
                        return [4 /*yield*/, this.questionAsync('')];
                    case 3:
                        _b.password = _c.sent();
                        if (this.verify()) {
                            console.log('Data verification has been successful.');
                        }
                        else {
                            console.log('Wrong email or password!');
                        }
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_1 = _c.sent();
                        console.error(error_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    PayWithPayPal.prototype.pay = function (paymentAmount) {
        if (this.signedIn) {
            console.log("Paying ".concat(paymentAmount, " using PayPal."));
            return true;
        }
        else {
            return false;
        }
    };
    PayWithPayPal.prototype.verify = function () {
        this.setSignedIn(this.email === PayWithPayPal.DATA_BASE.get(this.password));
        return this.signedIn;
    };
    PayWithPayPal.prototype.setSignedIn = function (signedIn) {
        this.signedIn = signedIn;
    };
    PayWithPayPal.prototype.questionAsync = function (prompt) {
        return new Promise(function (resolve) {
            rl.question(prompt, resolve);
        });
    };
    PayWithPayPal.DATA_BASE = new Map([
        ['password', 'payton@gmail.com'],
        ['qwerty', 'chloe@aol.com']
    ]);
    return PayWithPayPal;
}());
var PayWithCard = /** @class */ (function () {
    function PayWithCard() {
        this.number = '';
        this.date = '';
        this.cvv = '';
    }
    PayWithCard.prototype.collectPaymentDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, error_2;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 4, , 5]);
                        console.log('Enter the card number: ');
                        _a = this;
                        return [4 /*yield*/, this.questionAsync('')];
                    case 1:
                        _a.number = _d.sent();
                        console.log('Enter the card expiration date \'mm/yy\': ');
                        _b = this;
                        return [4 /*yield*/, this.questionAsync('')];
                    case 2:
                        _b.date = _d.sent();
                        console.log('Enter the CVV code: ');
                        _c = this;
                        return [4 /*yield*/, this.questionAsync('')];
                    case 3:
                        _c.cvv = _d.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _d.sent();
                        console.error(error_2);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PayWithCard.prototype.pay = function (paymentAmount) {
        if (this.number != '' && this.date != '' && this.cvv != '') {
            console.log("Paying ".concat(paymentAmount, " using Credit Card."));
            return true;
        }
        else {
            return false;
        }
    };
    PayWithCard.prototype.questionAsync = function (prompt) {
        return new Promise(function (resolve) {
            rl.question(prompt, resolve);
        });
    };
    return PayWithCard;
}());
// The context that the client works with
var Order = /** @class */ (function () {
    function Order() {
        this.totalCost = 0;
        this.closed = false;
    }
    Order.prototype.processOrder = function (strategy) {
        strategy.collectPaymentDetails();
    };
    Order.prototype.setTotalCost = function (num) {
        this.totalCost += num;
    };
    Order.prototype.getTotalCost = function () {
        return this.totalCost;
    };
    Order.prototype.setClosed = function () {
        this.closed = true;
    };
    Order.prototype.isClosed = function () {
        return this.closed;
    };
    return Order;
}());
// Concrete Strategy
var priceOnProducts = {
    1: 200,
    2: 150,
    3: 100,
    4: 50, // Memory
};
var strategy = null;
var order = new Order();
function questionAsync(prompt) {
    return new Promise(function (resolve) {
        rl.question(prompt, resolve);
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var cost, continueChoice, choice, _a, count, _b, paymentMethod;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!!order.isClosed()) return [3 /*break*/, 9];
                    cost = void 0;
                    continueChoice = void 0;
                    _c.label = 1;
                case 1:
                    console.log("Please, select a product:\n1 - Motherboard\n2 - CPU\n3 - HDD\n4 - Memory");
                    _a = parseInt;
                    return [4 /*yield*/, questionAsync('Enter your choice: ')];
                case 2:
                    choice = _a.apply(void 0, [_c.sent(), 10]);
                    cost = priceOnProducts[choice];
                    _b = parseInt;
                    return [4 /*yield*/, questionAsync('Count: ')];
                case 3:
                    count = _b.apply(void 0, [_c.sent(), 10]);
                    order.setTotalCost(cost * count);
                    return [4 /*yield*/, questionAsync('Do you wish to continue selecting products? Y/N: ')];
                case 4:
                    continueChoice = _c.sent();
                    _c.label = 5;
                case 5:
                    if (continueChoice.toUpperCase() === 'Y') return [3 /*break*/, 1];
                    _c.label = 6;
                case 6:
                    if (!(strategy === null)) return [3 /*break*/, 8];
                    console.log('Please, select a payment method:\n1 - PayPal\n2 - Credit Card');
                    return [4 /*yield*/, questionAsync('Enter your payment method: ')];
                case 7:
                    paymentMethod = _c.sent();
                    if (paymentMethod === '1') {
                        strategy = new PayWithPayPal();
                    }
                    else {
                        strategy = new PayWithCard();
                    }
                    _c.label = 8;
                case 8:
                    order.processOrder(strategy);
                    //const proceed = await questionAsync(`Pay ${order.getTotalCost()} units or Continue shopping? P/C: `);
                    if (true) { //proceed.toUpperCase() === 'P') {
                        if (strategy.pay(order.getTotalCost())) {
                            console.log('Payment has been successful.');
                        }
                        else {
                            console.log('FAIL! Please, check your data.');
                        }
                        order.setClosed();
                    }
                    return [3 /*break*/, 0];
                case 9:
                    rl.close();
                    return [2 /*return*/];
            }
        });
    });
}
main();
