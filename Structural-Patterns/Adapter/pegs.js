var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Round holes are compatible with only Round Pegs when used directly
var RoundHole = /** @class */ (function () {
    function RoundHole(radius) {
        this.radius = radius;
    }
    RoundHole.prototype.getRadius = function () {
        return this.radius;
    };
    RoundHole.prototype.fits = function (peg) {
        return this.getRadius() >= peg.getRadius();
    };
    return RoundHole;
}());
// Round peg is the Target class (the usual operation used)
var RoundPeg = /** @class */ (function () {
    function RoundPeg(radius) {
        if (radius !== undefined) {
            this.radius = radius;
        }
        else {
            this.radius = 0; // Default value is 0 (bc it is a square!)
        }
    }
    RoundPeg.prototype.getRadius = function () {
        return this.radius;
    };
    return RoundPeg;
}());
// Square peg is that adaptee that wont work with the Round Holes
var SquarePeg = /** @class */ (function () {
    function SquarePeg(width) {
        this.width = width;
    }
    SquarePeg.prototype.getWidth = function () {
        return this.width;
    };
    return SquarePeg;
}());
// This is our adapter that allows SquarePegs to 'fit' in RoundHoles
var SquarePegAdapter = /** @class */ (function (_super) {
    __extends(SquarePegAdapter, _super);
    function SquarePegAdapter(speg) {
        var _this = _super.call(this) || this;
        _this.speg = speg;
        return _this;
    }
    // Override get radius
    SquarePegAdapter.prototype.getRadius = function () {
        return (Math.sqrt(Math.pow((this.speg.getWidth() / 2), 2) * 2));
    };
    return SquarePegAdapter;
}(RoundPeg));
function client() {
    // Round fits round
    var hole = new RoundHole(5);
    var rpeg = new RoundPeg(5);
    if (hole.fits(rpeg)) {
        console.log("Round peg r5 fits round hole r5.");
    }
    var smallSqPeg = new SquarePeg(3);
    var largeSqPeg = new SquarePeg(10);
    // hole.fits(smallSqPeg); // Won't compile
    // Adapter solves the problem
    var smallSqPegAdapter = new SquarePegAdapter(smallSqPeg);
    var largeSqPegAdapter = new SquarePegAdapter(largeSqPeg);
    if (hole.fits(smallSqPegAdapter)) {
        console.log("Square peg w3 fits round hole r5.");
    }
    if (!hole.fits(largeSqPegAdapter)) {
        console.log("Square peg w10 does not fit into round hole r5.");
    }
}
client();
