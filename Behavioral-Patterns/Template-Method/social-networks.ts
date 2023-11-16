// Readline package
import * as readline from 'readline';

// Readline config
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to get and store user input to a variable
const questionAsync = (prompt: string): Promise<string> => {
    return new Promise(resolve => {
        rl.question(prompt, resolve);
    });
}

// Base Class w Template method
abstract class Network {
    protected username: string;
    protected password: string;

    public constructor() {}

    // Template method
    public post(msg: string){
        if(this.login(this.username, this.password)){
            const result = this.sendData(msg)
            this.logOut()
            return result;
        }
        return false;
    }

    abstract login(userName: string, password: string): boolean ;
    abstract sendData(data: string): boolean;
    abstract logOut(): void;
}

// Concrete class for Twitter
class Twitter extends Network {
    public constructor(username: string, password: string) {
        super()
        this.username = username
        this.password = password
    }

    public login(userName: string, password: string): boolean {
        console.log('Checking user credentials ...')
        console.log('Username: ' + userName)
        let pswd = ''
        for (let i = 0; i < password.length; i++) {
            pswd += '*'
        }
        console.log('Password: ' + pswd)
        console.log('...........\n')
        console.log('Twitter login success.')
        return true
    }

    public sendData(data: string): boolean {
        console.log(`Message: '${data}' was posted by ${this.username}`)
        return true
    }

    public logOut(): void {
       console.log(`User: '${this.username}' was logged out from twitter.`)
    }
}

// Concrete class for Facebook
class Facebook extends Network {
    public constructor(username: string, password: string) {
        super()
        this.username = username
        this.password = password
    }

    public login(userName: string, password: string): boolean {
        console.log('Checking user credentials ...')
        console.log('Username: ' + userName)
        let pswd = ''
        for (let i = 0; i < password.length; i++) {
            pswd += '*'
        }
        console.log('Password: ' + pswd)
        console.log('...........\n')
        console.log('Facebook login success.')
        return true
    }

    public sendData(data: string): boolean {
        console.log(`Message: '${data}' was posted by ${this.username}`)
        return true
    }

    public logOut(): void {
       console.log(`User: '${this.username}' was logged out from Facebook.`)
    }
}

// Client code
const client = async () => {
    const user = await questionAsync('Enter username: ')
    const pswd = await  questionAsync('Enter password: ')
    const msg = await  questionAsync('Enter your message: ')
    let network 
    rl.question('Choose a social network to post to:\n1. Twitter\n2. Facebook\n', (num) => {
        if(num == '1'){
            network = new Twitter(user, pswd)
        }else {
            network = new Facebook(user, pswd)
        }
        network.post(msg)
        console.log('Enter ^c to quit, Thank you!')
    })
}

client()

/* OUTPUT
Enter username: Payton
Enter password: qwery
Enter your message: Hello World
Choose a social network to post to:
1. Twitter
2. Facebook
2
Checking user credentials ...
Username: Payton
Password: *****
...........

Facebook login success.
Message: 'Hello World' was posted by Payton
User: 'Payton' was logged out from Facebook.
Enter ^c to quit, Thank you!
*/