// Implemenation
interface Device {
    isOn(): boolean;

    start(): void;

    stop(): void;

    getVolume(): number;

    setVolume(vol: number): void;

    getChannel(): number;

    setChannel(num: number): void;

    status(): void;

}

// First concrete implementation is a radio
class Radio implements Device {
    private on: boolean = false;
    private volume: number = 30;
    private channel: number = 1;

    public isOn(): boolean {
        return this.on;
    }

    public start(): void {
        this.on = true;
    }

    public stop(): void {
        this.on = false;
    }

    public getVolume(): number {
        return this.volume;
    }

    public setVolume(vol: number): void {
        if(vol <= 100 && vol >= 0){
            this.volume = vol
        }else if(vol > 100){
            this.volume = 100
        }else {
            this.volume = 0
        }
    }

    public getChannel(): number {
        return this.channel;
    }

    public setChannel(num: number): void {
        if(num < 1){
            this.channel = 1
        }else{
            this.channel = num
        }
    }

    public status(): void {
        let info = ``
        info += `------------------------------------\n`
        info += `| I'm a radio.\n`
        info += `| I'm ${this.on ? `enabled\n` : `disabled\n`}`
        info += `| Current volume is ` + this.volume + `/100\n`
        info += `| Current channel is ` + this.channel
        info += `\n------------------------------------\n`
        console.log(info)
    }
}

// Second concrete implementation is a TV
class TV implements Device {
    private on: boolean = false;
    private volume: number = 30;
    private channel: number = 1;

    public isOn(): boolean {
        return this.on;
    }

    public start(): void {
        this.on = true;
    }

    public stop(): void {
        this.on = false;
    }

    public getVolume(): number {
        return this.volume;
    }

    public setVolume(vol: number): void {
        if(vol <= 100 && vol >= 0){
            this.volume = vol
        }else if(vol > 100){
            this.volume = 100
        }else {
            this.volume = 0
        }
    }

    public getChannel(): number {
        return this.channel;
    }

    public setChannel(num: number): void {
        if(num < 1){
            this.channel = 1
        }else{
            this.channel = num
        }
    }

    public status(): void {
        let info = ``
        info += `------------------------------------\n`
        info += `| I'm a tv.\n`
        info += `| I'm ${this.on ? `enabled\n` : `disabled\n`}`
        info += `| Current volume is ` + this.volume + `/100\n`
        info += `| Current channel is ` + this.channel
        info += `\n------------------------------------\n`
        console.log(info)
    }
}

// Abstraction
interface Remote {
    power(): void;

    volumeDown(): void;

    volumeUp(): void;

    channelDown(): void;

    channelUp(): void;
}

class BasicRemote implements Remote {
    protected device: Device;

    public constructor(device: Device) {
        this.device = device
    }

    public power(): void {
        console.log('Remote: power toggle')
        if(this.device.isOn()){
            this.device.stop()
        } else {
            this.device.start()
        }
    }

    public volumeDown(): void {
        console.log('Remote: volume down')
        this.device.setVolume(this.device.getVolume() - 10)
    }

    public volumeUp(): void {
        console.log('Remote: volume up')
        this.device.setVolume(this.device.getVolume() + 10)
    }

    public channelDown(): void {
        console.log('Remote: channel down')
        this.device.setChannel(this.device.getChannel() - 1)
    }

    public channelUp(): void {
        console.log('Remote: channel up')
        this.device.setChannel(this.device.getChannel() + 1)
    }

}

// Advanced remote is a variation of remote with extra features
class AdvancedRemote extends BasicRemote  {

    public constructor(device: Device) {
        super(device)
    }

    public mute() {
        console.log("Remote: mute");
        this.device.setVolume(0);
    }
}

function testDevice(device: Device){
    const basicRemote = new BasicRemote(device);
    basicRemote.power();
    basicRemote.channelUp()
    basicRemote.channelUp()
    basicRemote.channelUp()
    basicRemote.volumeUp()
    basicRemote.power()
    device.status();

    const advRemote = new AdvancedRemote(device)
    advRemote.power()
    advRemote.channelUp()
    advRemote.mute()
    device.status()
}

testDevice(new Radio)
testDevice(new TV)

/* OUTPUT
Remote: power toggle
Remote: channel up
Remote: channel up
Remote: channel up
Remote: volume up
Remote: power toggle
------------------------------------
| I'm a radio.
| I'm disabled
| Current volume is 40/100
| Current channel is 4
------------------------------------

Remote: power toggle
Remote: channel up
Remote: mute
------------------------------------
| I'm a radio.
| I'm enabled
| Current volume is 0/100
| Current channel is 5
------------------------------------

Remote: power toggle
Remote: channel up
Remote: channel up
Remote: channel up
Remote: volume up
Remote: power toggle
------------------------------------
| I'm a tv.
| I'm disabled
| Current volume is 40/100
| Current channel is 4
------------------------------------

Remote: power toggle
Remote: channel up
Remote: mute
------------------------------------
| I'm a tv.
| I'm enabled
| Current volume is 0/100
| Current channel is 5
------------------------------------
*/