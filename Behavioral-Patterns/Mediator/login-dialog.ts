// The Mediator iterface
interface Mediator {
    notify(sender: object, event: string): void;
}

// Concrete mediator
class AuthenticationDialog implements Mediator {
    private button: Button;

    private textbox: TextBox;

    constructor(button: Button, textbox: TextBox) {
        this.button = button;
        this.button.setMediator(this);
        this.textbox = textbox;
        this.textbox.setMediator(this);
    }

    public notify(sender: object, event: string): void {
        if (event === 'click') {
            if(sender instanceof TextBox){
                const tb = sender as TextBox
                if(!tb.active()){
                    console.log(`${tb.getName()} textbox is now un-clicked, you can't type in it!`)
                }else{
                    console.log(`${tb.getName()} textbox is clicked, type in it!`)
                }
            }else if(sender instanceof Button){
                console.log(`Logging in with username: ${this.textbox.getText()}`)
            }
        }

        if (event === 'keydown') {
            const tb = sender as TextBox
            console.log(`Content of ${tb.getName()} textbox: ${tb.getText()}`)
        }
    }
}

// The base component
class Component {
    protected dialog: Mediator;

    constructor(dialog?: Mediator) {
        this.dialog = dialog!;
    }

    public setMediator(dialog: Mediator): void {
        this.dialog = dialog;
    }
}

// ConcreteComponent
class Button extends Component {
    public click(){
        this.dialog.notify(this, 'click')
    }
}

class TextBox extends Component {
    private text: string = '';
    private clicked: boolean = false;
    private name: string = 'unnamed'

    constructor(name: string){
        super()
        this.name = name
    }

    public active(): boolean{
        return this.clicked
    }

    public getName(): string {
        return this.name
    }

    public getText(){
        return this.text
    }

    public click(){
        this.clicked = !this.clicked
        this.dialog.notify(this, 'click')
    }

    public keyDown(key: string){
        if(this.clicked){
            this.text +=  key
            this.dialog.notify(this, 'keydown')
        }
    }
}

// Client code
const login = new Button();
const username = new TextBox('username');
const dialog = new AuthenticationDialog(login, username);

username.click()
username.keyDown('P')
username.keyDown('a')
username.keyDown('y')
username.keyDown('t')
username.keyDown('o')
username.click()
// attempted key down that won't work
username.keyDown('n')
username.click()
username.keyDown('n')
login.click()

/* OUTPUT
username textbox is clicked, type in it!
Content of username textbox: P
Content of username textbox: Pa
Content of username textbox: Pay
Content of username textbox: Payt
Content of username textbox: Payto
username textbox is now un-clicked, you can't type in it!
username textbox is clicked, type in it!
Content of username textbox: Payton
Logging in with username: Payton
*/