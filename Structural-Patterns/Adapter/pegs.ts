// Round holes are compatible with only Round Pegs when used directly
class RoundHole {
    private radius: number;

    public constructor(radius: number){
        this.radius = radius;
    }

    public getRadius(): number{
        return this.radius;
    }

    public fits(peg: RoundPeg): boolean{
        return this.getRadius() >= peg.getRadius()
    }
}

// Round peg is the Target class (the usual operation used)
class RoundPeg {
    private radius: number;

    public constructor(radius?: number){
        if (radius !== undefined) {
            this.radius = radius;
        } else {
            this.radius = 0; // Default value is 0 (bc it is a square!)
        }
    }

    public getRadius(): number{
        return this.radius;
    }
}

// Square peg is that adaptee that wont work with the Round Holes
class SquarePeg {
    private width: number;

    public constructor(width: number){
        this.width = width;
    }

    public getWidth(): number{
        return this.width;
    }

}

// This is our adapter that allows SquarePegs to 'fit' in RoundHoles
class SquarePegAdapter extends RoundPeg {
    private speg: SquarePeg;

    public constructor(speg: SquarePeg) {
        super()
        this.speg = speg
    }

    // Override get radius
    public  getRadius(): number {
        return (Math.sqrt(Math.pow((this.speg.getWidth() / 2), 2) * 2));
    }

}

function client() {
    // Round fits round
    const hole = new RoundHole(5);
    const rpeg = new RoundPeg(5);
    if (hole.fits(rpeg)) {
        console.log("Round peg r5 fits round hole r5.");
    }

    const smallSqPeg = new SquarePeg(3);
    const largeSqPeg = new SquarePeg(10);
    // hole.fits(smallSqPeg); // Won't compile

    // Adapter solves the problem
    const smallSqPegAdapter = new SquarePegAdapter(smallSqPeg);
    const largeSqPegAdapter = new SquarePegAdapter(largeSqPeg);
    if (hole.fits(smallSqPegAdapter)) {
        console.log("Square peg w3 fits round hole r5.");
    }
    if (!hole.fits(largeSqPegAdapter)) {
        console.log("Square peg w10 does not fit into round hole r5.");
    }
}

client()

/* OUTPUT
Round peg r5 fits round hole r5.
Square peg w3 fits round hole r5.
Square peg w10 does not fit into round hole r5.
*/