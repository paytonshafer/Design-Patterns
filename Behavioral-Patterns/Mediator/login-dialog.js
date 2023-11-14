var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Concrete mediator
var AuthenticationDialog = /** @class */ (function () {
    function AuthenticationDialog(button, textbox) {
        this.button = button;
        this.button.setMediator(this);
        this.textbox = textbox;
        this.textbox.setMediator(this);
    }
    AuthenticationDialog.prototype.notify = function (sender, event) {
        if (event === 'click') {
            if (sender instanceof TextBox) {
                var tb = sender;
                if (!tb.active()) {
                    console.log("".concat(tb.getName(), " textbox is now un-clicked, you can't type in it!"));
                }
                else {
                    console.log("".concat(tb.getName(), " textbox is clicked, type in it!"));
                }
            }
            else if (sender instanceof Button) {
                console.log("Logging in with username: ".concat(this.textbox.getText()));
            }
        }
        if (event === 'keydown') {
            var tb = sender;
            console.log("Content of ".concat(tb.getName(), " textbox: ").concat(tb.getText()));
        }
    };
    return AuthenticationDialog;
}());
// The base component
var Component = /** @class */ (function () {
    function Component(dialog) {
        this.dialog = dialog;
    }
    Component.prototype.setMediator = function (dialog) {
        this.dialog = dialog;
    };
    return Component;
}());
// ConcreteComponent
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Button.prototype.click = function () {
        this.dialog.notify(this, 'click');
    };
    return Button;
}(Component));
var TextBox = /** @class */ (function (_super) {
    __extends(TextBox, _super);
    function TextBox(name) {
        var _this = _super.call(this) || this;
        _this.text = '';
        _this.clicked = false;
        _this.name = 'unnamed';
        _this.name = name;
        return _this;
    }
    TextBox.prototype.active = function () {
        return this.clicked;
    };
    TextBox.prototype.getName = function () {
        return this.name;
    };
    TextBox.prototype.getText = function () {
        return this.text;
    };
    TextBox.prototype.click = function () {
        this.clicked = !this.clicked;
        this.dialog.notify(this, 'click');
    };
    TextBox.prototype.keyDown = function (key) {
        if (this.clicked) {
            this.text += key;
            this.dialog.notify(this, 'keydown');
        }
    };
    return TextBox;
}(Component));
// Client code
var login = new Button();
var username = new TextBox('username');
var dialog = new AuthenticationDialog(login, username);
username.click();
username.keyDown('P');
username.keyDown('a');
username.keyDown('y');
username.keyDown('t');
username.keyDown('o');
username.click();
// attempted key down that won't work
username.keyDown('n');
username.click();
username.keyDown('n');
login.click();
/* OUTPUT

*/ 
