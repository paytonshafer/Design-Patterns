// Car type is a 'part'
enum CarType {
    SPORTS_CAR = 'SPORTS CAR',
    SUV = 'SUV',
    SEDAN = 'SEDAN'
}

// Engine is a 'part'
class Engine {
    private fuelCapacity: Number;
    private mileage: Number;

    constructor(fuelCap: Number, mileage: Number){
        this.fuelCapacity = fuelCap;
        this.mileage = mileage;
    }

    public getFuelCap(): Number {
        return this.fuelCapacity;
    }

    public getMileage(): Number {
        return this.mileage;
    }

    public start(): void {
        console.log('Engine has started!')
    }

}

// Transmission is a 'part'
enum Transmission {
    AUTOMATIC = 'AUTOMATIC',
    SEMI_AUTOMATIC = 'SEMI AUTOMATIC',
    MANUAL = 'MANUAL'
}

// Trip computer is a 'part'
class TripComputer {
    private dest: string = ''

    public setDest(newDest: string): void {
        this.dest = newDest
    }

    public getDest(): void {
        if(this.dest = ''){
            console.log('Please set a destination.')
        } else {
            console.log(`Current destination: ${this.dest}`)
        }
    }

}

// Radio is a 'part'
class Radio {
    private xm: boolean = false;
    private touch: boolean = false;

    constructor(xm: boolean, touch: boolean){
        this.xm = xm;
        this.touch = touch;
    }

    public getInfo(): string {
        return `${this.xm ? 'FM, AM, XM Radio' : 'FM, AM Radio'}; ${this.touch ? 'Touch Screen Display' : 'Classic Display (Buttons and Knobs)'}`
    }

}

/**
 * The real world example of the builder pattern is implementint car production. Where the two products are a car
 * and a car manual. Below is the builder interface with all the possible steps needed in the process.
 */
interface Builder {
    setCarType(type: CarType): void;
    setSeats(num: Number): void;
    setEngine(engine: Engine): void;
    setTransmission(transmission: Transmission): void;
    setTripComputer(comp: TripComputer): void;
    setRadio(radio: Radio): void;
}

// Car builder where we set different parts of the car and return a new one
class CarBuilder implements Builder {
    private carType: CarType;
    private seats: Number;
    private engine: Engine;
    private transmission: Transmission;
    private tripComputer: TripComputer;
    private radio: Radio;

    public setCarType(type: CarType): void {
        this.carType = type
    }

    public setSeats(num: Number): void {
        this.seats = num
    }

    public setEngine(engine: Engine): void {
        this.engine = engine
    }

    public setTransmission(transmission: Transmission): void {
        this.transmission = transmission
    }

    public setTripComputer(comp: TripComputer): void {
        this.tripComputer = comp
    }

    public setRadio(radio: Radio): void {
        this.radio = radio
    }

    public getResult(): Car {
        return new Car(this.carType, this.seats, this.engine, this.transmission, this.tripComputer, this.radio)
    }
}

// Car Manual builder where we set different parts of the car (that would go in manual) and return a new one
class CarManualBuilder implements Builder {
    private carType: CarType;
    private seats: Number;
    private engine: Engine;
    private transmission: Transmission;
    private tripComputer: TripComputer;
    private radio: Radio;

    public setCarType(type: CarType): void {
        this.carType = type
    }
    
    public setSeats(num: Number): void {
        this.seats = num
    }

    public setEngine(engine: Engine): void {
        this.engine = engine
    }

    public setTransmission(transmission: Transmission): void {
        this.transmission = transmission
    }

    public setTripComputer(comp: TripComputer): void {
        this.tripComputer = comp
    }

    public setRadio(radio: Radio): void {
        this.radio = radio
    }

    public getResult(): CarManual {
        return new CarManual(this.carType, this.seats, this.engine, this.transmission, this.tripComputer, this.radio)
    }
}

// Car product class that is built using CarBuilder
class Car {
    private carType: CarType;
    private seats: Number;
    private engine: Engine;
    private transmission: Transmission;
    private tripComputer: TripComputer;
    private radio: Radio;

    constructor(type: CarType, seats: Number, engine: Engine, transmission: Transmission, tripComputer: TripComputer, radio: Radio){
        this.carType = type;
        this.seats = seats;
        this.engine = engine;
        this.transmission = transmission;
        this.tripComputer = tripComputer;
        this.radio = radio;
    }

    public getCarType(): CarType {
        return this.carType;
    }

    public getSeats(): Number {
        return this.seats;
    }

    public getEngine(): Engine{
        return this.engine;
    }

    public getTransmission(): Transmission {
        return this.transmission;
    }

    public getTripComputer(): TripComputer {
        return this.tripComputer;
    }

    public getRadio(): Radio {
        return this.radio;
    }
}

// Car Manual product class that is built using CarManualBuilder
class CarManual {
    private carType: CarType;
    private seats: Number;
    private engine: Engine;
    private transmission: Transmission;
    private tripComputer: TripComputer;
    private radio: Radio;

    constructor(type: CarType, seats: Number, engine: Engine, transmission: Transmission, tripComputer: TripComputer, radio: Radio){
        this.carType = type;
        this.seats = seats;
        this.engine = engine;
        this.transmission = transmission;
        this.tripComputer = tripComputer;
        this.radio = radio;
    }

    public print(): string {
        let info = ""
        info += `Car Type: ${this.carType}\n`
        info += `Number of Seats: ${this.seats}\n`
        info += `Engine info: Volume - ${this.engine.getFuelCap()} Gallons; Mileage - ${this.engine.getMileage()}\n`
        info += `Transmission Type: ${this.transmission}\n`
        if(this.tripComputer != null){
            info += 'Trip Computer: Functional\n'
        } else {
            info += 'Trip Computer: N/A\n'
        }
        
        info += `Radio info: ${this.radio.getInfo()}\n`

        return info;
    }
}

// Here is our director we define common cars/car manuals that will be built
class Director {
    public sportsCar(builder: Builder) {
        builder.setCarType(CarType.SPORTS_CAR)
        builder.setSeats(2)
        builder.setEngine(new Engine(12, 250))
        builder.setTransmission(Transmission.MANUAL)
        //builder.setTripComputer(new TripComputer()) dont set trip computer for sports car
        builder.setRadio(new Radio(false, false))
    }
    
    public SUV(builder: Builder) {
        builder.setCarType(CarType.SUV)
        builder.setSeats(6)
        builder.setEngine(new Engine(18, 300))
        builder.setTransmission(Transmission.AUTOMATIC)
        builder.setTripComputer(new TripComputer())
        builder.setRadio(new Radio(true, true))
    }

    public sedan(builder: Builder){
        builder.setCarType(CarType.SEDAN)
        builder.setSeats(4)
        builder.setEngine(new Engine(15, 350))
        builder.setTransmission(Transmission.SEMI_AUTOMATIC)
        builder.setTripComputer(new TripComputer())
        builder.setRadio(new Radio(true, false))
    }

}

// Client code creates one car and manual for each car type
const client = (director: Director) => {
    const carBuilder = new CarBuilder();
    const manualBuilder = new CarManualBuilder();

    // SPORTS CAR
    console.log('BUILD CAR')
    director.sportsCar(carBuilder)
    console.log('Car Built: ' + carBuilder.getResult().getCarType())
    carBuilder.getResult().getEngine().start()
    console.log()

    console.log('BUILD CAR MANUAL')
    director.sportsCar(manualBuilder)
    console.log(manualBuilder.getResult().print())

    // SUV
    console.log('BUILD CAR')
    director.SUV(carBuilder)
    console.log('Car Built: ' + carBuilder.getResult().getCarType())
    carBuilder.getResult().getEngine().start()
    console.log()

    console.log('BUILD CAR MANUAL')
    director.SUV(manualBuilder)
    console.log(manualBuilder.getResult().print())

    // SEDAN
    console.log('BUILD CAR')
    director.sedan(carBuilder)
    console.log('Car Built: ' + carBuilder.getResult().getCarType())
    carBuilder.getResult().getEngine().start()
    console.log()

    console.log('BUILD CAR MANUAL')
    director.sedan(manualBuilder)
    console.log(manualBuilder.getResult().print())
}

client(new Director())

/**
 * OUTPUT:
 * BUILD CAR
 * Car Built: SPORTS CAR
 * Engine has started!

 * BUILD CAR MANUAL
 * Car Type: SPORTS CAR
 * Number of Seats: 2
 * Engine info: Volume - 12 Gallons; Mileage - 250
 * Transmission Type: MANUAL
 * Trip Computer: N/A
 * Radio info: FM, AM Radio; Classic Display (Buttons and Knobs)
 * 
 * BUILD CAR
 * Car Built: SUV
 * Engine has started!

 * BUILD CAR MANUAL
 * Car Type: SUV
 * Number of Seats: 6
 * Engine info: Volume - 18 Gallons; Mileage - 300
 * Transmission Type: AUTOMATIC
 * Trip Computer: Functional
 * Radio info: FM, AM, XM Radio; Touch Screen Display

 * BUILD CAR
 * Car Built: SEDAN
 * Engine has started!

 * BUILD CAR MANUAL
 * Car Type: SEDAN
 * Number of Seats: 4
 * Engine info: Volume - 15 Gallons; Mileage - 350
 * Transmission Type: SEMI AUTOMATIC
 * Trip Computer: Functional
 * Radio info: FM, AM, XM Radio; Classic Display (Buttons and Knobs)
 */