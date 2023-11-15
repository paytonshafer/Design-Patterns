"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// Concrete factory for victorian varient
var VictorianFurnitureFactory = /** @class */ (function () {
    function VictorianFurnitureFactory() {
    }
    VictorianFurnitureFactory.prototype.orderChair = function () {
        return new VictorianChair();
    };
    VictorianFurnitureFactory.prototype.orderSofa = function () {
        return new VictorianSofa();
    };
    VictorianFurnitureFactory.prototype.orderTable = function () {
        return new VictorianTable();
    };
    return VictorianFurnitureFactory;
}());
// Concrete factory for modern varient
var ModernFurnitureFactory = /** @class */ (function () {
    function ModernFurnitureFactory() {
    }
    ModernFurnitureFactory.prototype.orderChair = function () {
        return new ModernChair();
    };
    ModernFurnitureFactory.prototype.orderSofa = function () {
        return new ModernSofa();
    };
    ModernFurnitureFactory.prototype.orderTable = function () {
        return new ModernTable();
    };
    return ModernFurnitureFactory;
}());
// Concrete factory for art deco varient
var ArtDecoFurnitureFactory = /** @class */ (function () {
    function ArtDecoFurnitureFactory() {
    }
    ArtDecoFurnitureFactory.prototype.orderChair = function () {
        return new ArtDecoChair();
    };
    ArtDecoFurnitureFactory.prototype.orderSofa = function () {
        return new ArtDecoSofa();
    };
    ArtDecoFurnitureFactory.prototype.orderTable = function () {
        return new ArtDecoTable();
    };
    return ArtDecoFurnitureFactory;
}());
// Sofa for victorian varient
var VictorianSofa = /** @class */ (function () {
    function VictorianSofa() {
    }
    VictorianSofa.prototype.describe = function () {
        return 'x victorian sofa';
    };
    return VictorianSofa;
}());
// Sofa for modern varient
var ModernSofa = /** @class */ (function () {
    function ModernSofa() {
    }
    ModernSofa.prototype.describe = function () {
        return 'x modern sofa';
    };
    return ModernSofa;
}());
// Sofa for art deco varient
var ArtDecoSofa = /** @class */ (function () {
    function ArtDecoSofa() {
    }
    ArtDecoSofa.prototype.describe = function () {
        return 'x art deco sofa';
    };
    return ArtDecoSofa;
}());
// Chair for victorian varient
var VictorianChair = /** @class */ (function () {
    function VictorianChair() {
    }
    VictorianChair.prototype.describe = function () {
        return 'x victorian chair';
    };
    return VictorianChair;
}());
// Chair for modern varient
var ModernChair = /** @class */ (function () {
    function ModernChair() {
    }
    ModernChair.prototype.describe = function () {
        return 'x modern chair';
    };
    return ModernChair;
}());
// Chair for art deco varient
var ArtDecoChair = /** @class */ (function () {
    function ArtDecoChair() {
    }
    ArtDecoChair.prototype.describe = function () {
        return 'x art deco chair';
    };
    return ArtDecoChair;
}());
// Table for victorian varient
var VictorianTable = /** @class */ (function () {
    function VictorianTable() {
    }
    VictorianTable.prototype.describe = function () {
        return 'x victorian table';
    };
    return VictorianTable;
}());
// Table for modern varient
var ModernTable = /** @class */ (function () {
    function ModernTable() {
    }
    ModernTable.prototype.describe = function () {
        return 'x modern table';
    };
    return ModernTable;
}());
// Table for art deco varient
var ArtDecoTable = /** @class */ (function () {
    function ArtDecoTable() {
    }
    ArtDecoTable.prototype.describe = function () {
        return 'x art deco table';
    };
    return ArtDecoTable;
}());
// The client code is a furnature shop that takes a furniture factory and gets the number of items you want and returns your order summary
function furnitureShop(factory) {
    var chair = factory.orderChair();
    var sofa = factory.orderSofa();
    var table = factory.orderTable();
    var num_chairs = '0';
    var num_sofas = '0';
    var num_tables = '0';
    rl.question('\nHow many chairs? ', function (num) {
        num_chairs = num;
        rl.question('How many sofas? ', function (num) {
            num_sofas = num;
            rl.question('How many tables? ', function (num) {
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
rl.question('Choose a furniture style [victorian/modern/art-deco]: ', function (style) {
    switch (style.toLowerCase()) {
        case 'victorian':
            furnitureShop(new VictorianFurnitureFactory());
            break;
        case 'modern':
            furnitureShop(new ModernFurnitureFactory());
            break;
        case 'art-deco':
            furnitureShop(new ArtDecoFurnitureFactory());
            break;
        default:
            console.log('Invalid furniture style.');
            rl.close();
    }
});
