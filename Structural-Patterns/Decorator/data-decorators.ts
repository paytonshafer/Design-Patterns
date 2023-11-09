import * as fs from 'fs';

// Base Componenent
interface DataSource {
    writeData(data: string): void;

    readData(): string;
}

// Concrete Conponenent
class FileDataSource implements DataSource {
    private name: string;

    public constructor(name: string) {
        this.name = name;
    }

    public writeData(data: string): void {
        try {
            fs.writeFileSync(this.name, data, 'utf8');
        } catch (ex) {
            console.log(ex.message);
        }
    }

    public readData(): string {
        try {
            const buffer = fs.readFileSync(this.name, 'utf8');
            return buffer;
        } catch (ex) {
            console.log(ex.message);
            return '';
        }
    }

}

// Base Decorator
class DataSourceDecorator implements DataSource {
    private wrappee: DataSource;

    public constructor(src: DataSource) {
        this.wrappee = src;
    }

    public writeData(data: string): void {
        this.wrappee.writeData(data)
    }

    public readData(): string {
       return this.wrappee.readData()
    }

}

// Concrete Decorator for Encryption
class EncryptionDecorator extends DataSourceDecorator {
    public constructor(src: DataSource){
        super(src)
    }

    public writeData(data: string): void {
        super.writeData(this.encode(data))
    }

    public readData(): string {
       return this.decode(super.readData())
    }

    private encode(data: string): string {
        const result: number[] = [];
        for (let i = 0; i < data.length; i++) {
            result.push(data.charCodeAt(i) + 1);
        }
        const encoded = String.fromCharCode(...result);
        return btoa(encoded);
    }

    private decode(data: string): string {
        const decoded = atob(data);
        const result: number[] = [];
        for (let i = 0; i < decoded.length; i++) {
            result.push(decoded.charCodeAt(i) - 1);
        }
        return String.fromCharCode(...result);
    }
}

// Client funcitons
const writeSensitiveData = (name: string, data: string) => {
    const file = new FileDataSource(name)
    const e = new EncryptionDecorator(file)
    e.writeData(data)
}

const writeUnsensitiveData = (name: string, data: string) => {
    const file = new FileDataSource(name)
    file.writeData(data)
}

const readSensitiveData = (file: string) => {
    const test = new FileDataSource(file)
    const d = new EncryptionDecorator(test)
    console.log(d.readData())
}
const readUnsensitiveData = (name: string) => {
    const file = new FileDataSource(name)
    console.log(file.readData())
}

console.log("Writing public data to 'safe.txt'. Open the file to read it.")
writeUnsensitiveData('data/safe.txt', 'Hello this is public data for anyone with the file to read!')
console.log("Reading public data from 'safe.txt'. It is already human readable.")
readUnsensitiveData('data/safe.txt')
console.log()
console.log("Writing secret data to 'secrets.txt'. Open the file to see the encoded message.")
writeSensitiveData('data/secrets.txt', 'Hello this is secret data, but even if you get the file it is encoded')
console.log("Reading secret data from 'secrets.txt'. The data must be decoded before it is human readable.")
readSensitiveData('data/secrets.txt')

/* OUTPUT
Writing public data to 'safe.txt'. Open the file to read it.
*FROM FILE: Hello this is public data for anyone with the file to read!*
Reading public data from 'safe.txt'. It is already human readable.
Hello this is public data for anyone with the file to read!

Writing secret data to 'secrets.txt'. Open the file to see the encoded message.
*FROM FILE: SWZtbXAhdWlqdCFqdCF0ZmRzZnUhZWJ1Yi0hY3Z1IWZ3Zm8hamchenB2IWhmdSF1aWYhZ2ptZiFqdSFqdCFmb2RwZWZl*
Reading secret data from 'secrets.txt'. The data must be decoded before it is human readable.
Hello this is secret data, but even if you get the file it is encoded
*/