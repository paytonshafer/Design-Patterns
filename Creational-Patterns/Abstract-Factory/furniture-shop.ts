import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// The furniture factory represents the abstract factory with the product family being chair, sofa and table
interface FurnitureFactory {
    orderChair(): Chair;

    orderSofa(): Sofa;

    orderTable(): Table;
}

// Concrete factory for victorian varient
class VictorianFurnitureFactory implements FurnitureFactory{
    public orderChair(): Chair {
        return new VictorianChair();
    }

    public orderSofa(): Sofa {
        return new VictorianSofa();
    }

    public orderTable(): Table {
        return new VictorianTable();
    }
}

// Concrete factory for modern varient
class ModernFurnitureFactory implements FurnitureFactory{
    public orderChair(): Chair {
        return new ModernChair();
    }

    public orderSofa(): Sofa {
        return new ModernSofa();
    }

    public orderTable(): Table {
        return new ModernTable();
    }
}

// Concrete factory for art deco varient
class ArtDecoFurnitureFactory implements FurnitureFactory{
    public orderChair(): Chair {
        return new ArtDecoChair();
    }

    public orderSofa(): Sofa {
        return new ArtDecoSofa();
    }

    public orderTable(): Table {
        return new ArtDecoTable();
    }
}

// First product of the product family is a sofa
interface Sofa {
    // describe function describes what product and varient it is
    describe(): string;
}

// Sofa for victorian varient
class VictorianSofa implements Sofa {
    public describe(): string {
        return 'x victorian sofa'
    }
}

// Sofa for modern varient
class ModernSofa implements Sofa {
    public describe(): string {
        return 'x modern sofa'
    }
}

// Sofa for art deco varient
class ArtDecoSofa implements Sofa {
    public describe(): string {
        return 'x art deco sofa'
    }
}

// Second product of the product family is a chair
interface Chair {
    // describe function describes what product and varient it is
    describe(): string;
}

// Chair for victorian varient
class VictorianChair implements Chair {
    public describe(): string {
        return 'x victorian chair'
    }
}

// Chair for modern varient
class ModernChair implements Chair {
    public describe(): string {
        return 'x modern chair'
    }
}

// Chair for art deco varient
class ArtDecoChair implements Chair {
    public describe(): string {
        return 'x art deco chair'
    }
}

// Third and final product of the product family is a table
interface Table {
    // describe function describes what product and varient it is
    describe(): string;
}

// Table for victorian varient
class VictorianTable implements Table {
    public describe(): string {
        return 'x victorian table'
    }
}

// Table for modern varient
class ModernTable implements Table {
    public describe(): string {
        return 'x modern table'
    }
}

// Table for art deco varient
class ArtDecoTable implements Table {
    public describe(): string {
        return 'x art deco table'
    }
}

// The client code is a furnature shop that takes a furniture factory and gets the number of items you want and returns your order summary
function furnitureShop(factory: FurnitureFactory) {
    const chair = factory.orderChair();
    const sofa = factory.orderSofa();
    const table = factory.orderTable();
    let num_chairs = '0'
    let num_sofas = '0'
    let num_tables = '0'

    rl.question('\nHow many chairs? ', (num) => {
        num_chairs = num;
        rl.question('How many sofas? ', (num) => {
            num_sofas = num;
            rl.question('How many tables? ', (num) => {
                num_tables = num;
                console.log('\nOrder Summary:');
                console.log(num_chairs + chair.describe());
                console.log(num_sofas + sofa.describe());
                console.log(num_tables + table.describe());
                rl.close();
            });
        });
    });
}

// Get the desired furnature style and call furniture shop with the respective factory for that varient
rl.question('Choose a furniture style [victorian/modern/art-deco]: ', (style) => {
    switch(style.toLowerCase()) {
        case 'victorian':
            furnitureShop(new VictorianFurnitureFactory())
            break;
        case 'modern':
            furnitureShop(new ModernFurnitureFactory())
            break;
        case 'art-deco':
            furnitureShop(new ArtDecoFurnitureFactory())
            break;
        default:
            console.log('Invalid furniture style.');
            rl.close();
    }
})