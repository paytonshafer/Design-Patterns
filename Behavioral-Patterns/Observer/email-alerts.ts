// Subject (Publisher)
interface EmailNotifer {
    attach(app: LocalEmailApp): void;

    detach(app: LocalEmailApp): void;

    notify(): void;
}

// Subject
class PaytonEmailNotifer implements EmailNotifer {
    public numEmails: number = 0;

    private localEmailApps: LocalEmailApp[] = [];

    public attach(app: LocalEmailApp): void {
        const isExist = this.localEmailApps.includes(app);
        if (isExist) {
            return console.log('EmailNotifer: Observer has been attached already.');
        }

        console.log('EmailNotifer: Attached an observer.');
        this.localEmailApps.push(app);
    }

    public detach(app: LocalEmailApp): void {
        const appIndex = this.localEmailApps.indexOf(app);
        if (appIndex === -1) {
            return console.log('EmailNotifer: Nonexistent observer.');
        }

        this.localEmailApps.splice(appIndex, 1);
        console.log('EmailNotifer: Detached an observer.');
    }

    public notify(): void {
        console.log('EmailNotifer: Notifying local apps...');
        for (const observer of this.localEmailApps) {
            observer.update(this);
        }
    }

    public receive(): void {
        const rand = Math.floor(Math.random() * (10 + 2));
        this.numEmails += rand
        console.log(`EmailNotifer: received ${rand} new emails.`)

        this.notify();
    }

    public read(num: number): void {
        this.numEmails -= num;
    }
}

// The Observer interface
interface LocalEmailApp {
    update(emialNotifer: EmailNotifer): void;
}

class PhoneEmailApp implements LocalEmailApp{
    public update(emialNotifer: EmailNotifer): void {
        if (emialNotifer instanceof PaytonEmailNotifer) {
            console.log('Email App on Phone: You have ' + emialNotifer.numEmails + ' unread messages.');
            if(emialNotifer.numEmails > 20){
                console.log('Client on Phone: That is a lot, lets read 10 of them.')
                emialNotifer.read(10)
            }
        }
    }
}

class ComputerEmailApp implements LocalEmailApp{
    public update(emialNotifer: EmailNotifer): void {
        if (emialNotifer instanceof PaytonEmailNotifer) {
            console.log('Email App on Computer: You have ' + emialNotifer.numEmails + ' unread messages.');
        }
    }
}

// Client code
const email = new PaytonEmailNotifer();

const phone = new PhoneEmailApp();
email.attach(phone);

const computer = new ComputerEmailApp();
email.attach(computer);
console.log()
email.receive();
console.log()
email.receive();
console.log()
email.receive();
console.log()
email.receive();
console.log()


/* OUTPUT
EmailNotifer: Attached an observer.
EmailNotifer: Attached an observer.

EmailNotifer: received 4 new emails.
EmailNotifer: Notifying local apps...
Email App on Phone: You have 4 unread messages.
Email App on Computer: You have 4 unread messages.

EmailNotifer: received 10 new emails.
EmailNotifer: Notifying local apps...
Email App on Phone: You have 14 unread messages.
Email App on Computer: You have 14 unread messages.

EmailNotifer: received 6 new emails.
EmailNotifer: Notifying local apps...
Email App on Phone: You have 20 unread messages.
Email App on Computer: You have 20 unread messages.

EmailNotifer: received 7 new emails.
EmailNotifer: Notifying local apps...
Email App on Phone: You have 27 unread messages.
Client on Phone: That is a lot, lets read 10 of them.
Email App on Computer: You have 17 unread messages.
*/