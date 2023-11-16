import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Strategy interface
interface PayStrategy {
    pay(paymentAmount: number): boolean;
    collectPaymentDetails(): void;
}

class PayWithPayPal implements PayStrategy {
    private static readonly DATA_BASE: Map<string, string> = new Map([
        ['password', 'payton@gmail.com'],
        ['qwerty', 'chloe@aol.com']
    ]);

    private email: string = '';
    private password: string = '';
    private signedIn: boolean = false;

    async collectPaymentDetails(): Promise<void> {
        try {
            while (!this.signedIn) {
                console.log('Enter the user\'s email: ');
                this.email = await this.questionAsync('');

                console.log('Enter the password: ');
                this.password = await this.questionAsync('');

                if (this.verify()) {
                    console.log('Data verification has been successful.');
                } else {
                    console.log('Wrong email or password!');
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    public pay(paymentAmount: number): boolean {
        if (this.signedIn) {
            console.log(`Paying ${paymentAmount} using PayPal.`);
            return true;
        } else {
            return false;
        }
    }

    private verify(): boolean {
        this.setSignedIn(this.email === PayWithPayPal.DATA_BASE.get(this.password));
        return this.signedIn;
    }

    private setSignedIn(signedIn: boolean): void {
        this.signedIn = signedIn;
    }

    private questionAsync(prompt: string): Promise<string> {
        return new Promise(resolve => {
            rl.question(prompt, resolve);
        });
    }
}

class PayWithCard implements PayStrategy {
    private number: string = ''
    private date: string = ''
    private cvv: string = ''
  
    async collectPaymentDetails(): Promise<void> {
      try {
        console.log('Enter the card number: ');
        this.number = await this.questionAsync('');
        
        console.log('Enter the card expiration date \'mm/yy\': ');
        this.date = await this.questionAsync('');
        
        console.log('Enter the CVV code: ');
        this.cvv = await this.questionAsync('');
      } catch (error) {
        console.error(error);
      }
    }
  
    public pay(paymentAmount: number): boolean {
      if (this.number != '' && this.date != '' && this.cvv != '') {
        console.log(`Paying ${paymentAmount} using Credit Card.`);
        return true;
      } else {
        return false;
      }
    }
  
    private questionAsync(prompt: string): Promise<string> {
      return new Promise(resolve => {
        rl.question(prompt, resolve);
      });
    }
}

// The context that the client works with
class Order {
    private totalCost: number = 0;
    private closed: boolean = false;

    public processOrder(strategy: any) {
        strategy.collectPaymentDetails();
    }

    public setTotalCost(num: number) {
        this.totalCost += num;
    }

    public getTotalCost() {
        return this.totalCost
    }

    public setClosed() {
        this.closed = true
    }

    public isClosed() {
        return this.closed;
    }
}

// Concrete Strategy
const priceOnProducts: Record<number, number> = {
    1: 200, // Motherboard
    2: 150, // CPU
    3: 100, // HDD
    4: 50,  // Memory
};

let strategy: PayStrategy | null = null;
const order = new Order();

function questionAsync(prompt: string): Promise<string> {
    return new Promise(resolve => {
        rl.question(prompt, resolve);
    });
}

async function main() {
    while (!order.isClosed()) {
        let cost: number;

        let continueChoice: string;
        do {
            console.log(
                `Please, select a product:\n1 - Motherboard\n2 - CPU\n3 - HDD\n4 - Memory`
            );
            const choice = parseInt(await questionAsync('Enter your choice: '), 10);
            cost = priceOnProducts[choice];
            const count = parseInt(await questionAsync('Count: '), 10);
            order.setTotalCost(cost * count);
            continueChoice = await questionAsync('Do you wish to continue selecting products? Y/N: ');
        } while (continueChoice.toUpperCase() === 'Y');

        if (strategy === null) {
            console.log(
                'Please, select a payment method:\n1 - PayPal\n2 - Credit Card'
            );
            const paymentMethod = await questionAsync('Enter your payment method: ');

            if (paymentMethod === '1') {
                strategy = new PayWithPayPal();
            } else {
                strategy = new PayWithCard();
            }
        }

        order.processOrder(strategy);

        const proceed = await questionAsync(`Pay ${order.getTotalCost()} units or Continue shopping? P/C: `);
        if (proceed.toUpperCase() === 'P') {
            if (strategy.pay(order.getTotalCost())) {
                console.log('Payment has been successful.');
            } else {
                console.log('FAIL! Please, check your data.');
            }
            order.setClosed();
        }
    }

    rl.close();
}

main();