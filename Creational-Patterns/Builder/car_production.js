// Car type is a 'part'
var CarType;
(function (CarType) {
    CarType["SPORTS_CAR"] = "SPORTS CAR";
    CarType["SUV"] = "SUV";
    CarType["SEDAN"] = "SEDAN";
})(CarType || (CarType = {}));
// Engine is a 'part'
var Engine = /** @class */ (function () {
    function Engine(fuelCap, mileage) {
        this.fuelCapacity = fuelCap;
        this.mileage = mileage;
    }
    Engine.prototype.getFuelCap = function () {
        return this.fuelCapacity;
    };
    Engine.prototype.getMileage = function () {
        return this.mileage;
    };
    Engine.prototype.start = function () {
        console.log('Engine has started!');
    };
    return Engine;
}());
// Transmission is a 'part'
var Transmission;
(function (Transmission) {
    Transmission["AUTOMATIC"] = "AUTOMATIC";
    Transmission["SEMI_AUTOMATIC"] = "SEMI AUTOMATIC";
    Transmission["MANUAL"] = "MANUAL";
})(Transmission || (Transmission = {}));
// Trip computer is a 'part'
var TripComputer = /** @class */ (function () {
    function TripComputer() {
        this.dest = '';
    }
    TripComputer.prototype.setDest = function (newDest) {
        this.dest = newDest;
    };
    TripComputer.prototype.getDest = function () {
        if (this.dest = '') {
            console.log('Please set a destination.');
        }
        else {
            console.log("Current destination: ".concat(this.dest));
        }
    };
    return TripComputer;
}());
// Radio is a 'part'
var Radio = /** @class */ (function () {
    function Radio(xm, touch) {
        this.xm = false;
        this.touch = false;
        this.xm = xm;
        this.touch = touch;
    }
    Radio.prototype.getInfo = function () {
        return "".concat(this.xm ? 'FM, AM, XM Radio' : 'FM, AM Radio', "; ").concat(this.touch ? 'Touch Screen Display' : 'Classic Display (Buttons and Knobs)');
    };
    return Radio;
}());
// Car builder where we set different parts of the car and return a new one
var CarBuilder = /** @class */ (function () {
    function CarBuilder() {
    }
    CarBuilder.prototype.setCarType = function (type) {
        this.carType = type;
    };
    CarBuilder.prototype.setSeats = function (num) {
        this.seats = num;
    };
    CarBuilder.prototype.setEngine = function (engine) {
        this.engine = engine;
    };
    CarBuilder.prototype.setTransmission = function (transmission) {
        this.transmission = transmission;
    };
    CarBuilder.prototype.setTripComputer = function (comp) {
        this.tripComputer = comp;
    };
    CarBuilder.prototype.setRadio = function (radio) {
        this.radio = radio;
    };
    CarBuilder.prototype.getResult = function () {
        return new Car(this.carType, this.seats, this.engine, this.transmission, this.tripComputer, this.radio);
    };
    return CarBuilder;
}());
// Car Manual builder where we set different parts of the car (that would go in manual) and return a new one
var CarManualBuilder = /** @class */ (function () {
    function CarManualBuilder() {
    }
    CarManualBuilder.prototype.setCarType = function (type) {
        this.carType = type;
    };
    CarManualBuilder.prototype.setSeats = function (num) {
        this.seats = num;
    };
    CarManualBuilder.prototype.setEngine = function (engine) {
        this.engine = engine;
    };
    CarManualBuilder.prototype.setTransmission = function (transmission) {
        this.transmission = transmission;
    };
    CarManualBuilder.prototype.setTripComputer = function (comp) {
        this.tripComputer = comp;
    };
    CarManualBuilder.prototype.setRadio = function (radio) {
        this.radio = radio;
    };
    CarManualBuilder.prototype.getResult = function () {
        return new CarManual(this.carType, this.seats, this.engine, this.transmission, this.tripComputer, this.radio);
    };
    return CarManualBuilder;
}());
// Car product class that is built using CarBuilder
var Car = /** @class */ (function () {
    function Car(type, seats, engine, transmission, tripComputer, radio) {
        this.carType = type;
        this.seats = seats;
        this.engine = engine;
        this.transmission = transmission;
        this.tripComputer = tripComputer;
        this.radio = radio;
    }
    Car.prototype.getCarType = function () {
        return this.carType;
    };
    Car.prototype.getSeats = function () {
        return this.seats;
    };
    Car.prototype.getEngine = function () {
        return this.engine;
    };
    Car.prototype.getTransmission = function () {
        return this.transmission;
    };
    Car.prototype.getTripComputer = function () {
        return this.tripComputer;
    };
    Car.prototype.getRadio = function () {
        return this.radio;
    };
    return Car;
}());
// Car Manual product class that is built using CarManualBuilder
var CarManual = /** @class */ (function () {
    function CarManual(type, seats, engine, transmission, tripComputer, radio) {
        this.carType = type;
        this.seats = seats;
        this.engine = engine;
        this.transmission = transmission;
        this.tripComputer = tripComputer;
        this.radio = radio;
    }
    CarManual.prototype.print = function () {
        var info = "";
        info += "Car Type: ".concat(this.carType, "\n");
        info += "Number of Seats: ".concat(this.seats, "\n");
        info += "Engine info: Volume - ".concat(this.engine.getFuelCap(), " Gallons; Mileage - ").concat(this.engine.getMileage(), "\n");
        info += "Transmission Type: ".concat(this.transmission, "\n");
        if (this.tripComputer != null) {
            info += 'Trip Computer: Functional\n';
        }
        else {
            info += 'Trip Computer: N/A\n';
        }
        info += "Radio info: ".concat(this.radio.getInfo(), "\n");
        return info;
    };
    return CarManual;
}());
// Here is our director we define common cars/car manuals that will be built
var Director = /** @class */ (function () {
    function Director() {
    }
    Director.prototype.sportsCar = function (builder) {
        builder.setCarType(CarType.SPORTS_CAR);
        builder.setSeats(2);
        builder.setEngine(new Engine(12, 250));
        builder.setTransmission(Transmission.MANUAL);
        //builder.setTripComputer(new TripComputer()) dont set trip computer for sports car
        builder.setRadio(new Radio(false, false));
    };
    Director.prototype.SUV = function (builder) {
        builder.setCarType(CarType.SUV);
        builder.setSeats(6);
        builder.setEngine(new Engine(18, 300));
        builder.setTransmission(Transmission.AUTOMATIC);
        builder.setTripComputer(new TripComputer());
        builder.setRadio(new Radio(true, true));
    };
    Director.prototype.sedan = function (builder) {
        builder.setCarType(CarType.SEDAN);
        builder.setSeats(4);
        builder.setEngine(new Engine(15, 350));
        builder.setTransmission(Transmission.SEMI_AUTOMATIC);
        builder.setTripComputer(new TripComputer());
        builder.setRadio(new Radio(true, false));
    };
    return Director;
}());
var client = function (director) {
    var carBuilder = new CarBuilder();
    var manualBuilder = new CarManualBuilder();
    // SPORTS CAR
    console.log('BUILD CAR');
    director.sportsCar(carBuilder);
    console.log('Car Built: ' + carBuilder.getResult().getCarType());
    carBuilder.getResult().getEngine().start();
    console.log();
    console.log('BUILD CAR MANUAL');
    director.sportsCar(manualBuilder);
    console.log(manualBuilder.getResult().print());
    // SUV
    console.log('BUILD CAR');
    director.SUV(carBuilder);
    console.log('Car Built: ' + carBuilder.getResult().getCarType());
    carBuilder.getResult().getEngine().start();
    console.log();
    console.log('BUILD CAR MANUAL');
    director.SUV(manualBuilder);
    console.log(manualBuilder.getResult().print());
    // SEDAN
    console.log('BUILD CAR');
    director.sedan(carBuilder);
    console.log('Car Built: ' + carBuilder.getResult().getCarType());
    carBuilder.getResult().getEngine().start();
    console.log();
    console.log('BUILD CAR MANUAL');
    director.sedan(manualBuilder);
    console.log(manualBuilder.getResult().print());
};
client(new Director());
