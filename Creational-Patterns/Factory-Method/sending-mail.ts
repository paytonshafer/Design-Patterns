/*
* This is a specific example of the factory method in TypeScript
* You can either compile with something like tsc to turn to JavaSciprt
* or remove all types, replace abtract and interface with plain classes 
* and make abstract methods throw an error in the base case (the error will be thrown if not redefined).
*/

// Creator class with factory method
abstract class Mail {
    // Creater declaring factory method to be defined by subclass
    public abstract methodOfTransportaiton(): Transport;

    // our operation in this case is to deliver the mail
    public deliverMail(): string {
        // create our prodect with certian method of transportation
        const method = this.methodOfTransportaiton()
        // use the product and deliver the mail
        return `The mail was ${method.deliver()} The mail is delivered using the same code no matter the method.`
    }
}


// Mail can be sent by air with 
class AirMail extends Mail {
    // Set the factory method to create planes
    public methodOfTransportaiton(): Transport {
        return new Plane();
    }
}

// Here is another concrete creator that overrides the factory method to craete a concrete product (B)
class GroundMail extends Mail {
    private selectedTransport: Transport; // variable for out mode of transportation

    // Get transportation mode from constructor
    constructor(transport: Transport) {
        super();
        this.selectedTransport = transport; 
    }

    // Set the method to what was given
    public methodOfTransportaiton(): Transport {
        return this.selectedTransport;
    }
}


// Product interface is the method of transportation used to deliver the mail
interface Transport {
    deliver(): string;
}

// Concrete product delivered by plane
class Plane implements Transport {
    public deliver(): string {
        return 'delivered by plane.'
    }
}

// Concrete product delivered by train
class Train implements Transport {
    public deliver(): string {
        return 'delivered by train.'
    }
}

// Concrete product delivered by truck
class Truck implements Transport {
    public deliver(): string {
        return 'delivered by truck.'
    }
}

// Function representing client post office who sends out mail to be delivered
function postOffice(mailType: string, transport: Transport) {
    let mail: Mail; // Initalize mail object

    // Based on mail type create specific type of transportations
    if (mailType === 'AirMail') {
        mail = new AirMail();
    } else if (mailType === 'GroundMail') {
        mail = new GroundMail(transport);
    } else {
        throw new Error('Invalid mail type');
    }

    // Deliver the mail
    console.log(mail.deliverMail());
}

console.log('Sending mail by air.')
postOffice('AirMail', new Plane());
console.log('')
console.log('Sending mail by ground.')
postOffice('GroundMail', new Train());
postOffice('GroundMail', new Truck());