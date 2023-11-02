/**
 * The builder interfacepecifies methods for creating different parts of the product.
 */
interface Builder {
    producePartA(num: Number): void;
    producePartB(num: Number): void;
    producePartZ(num: Number): void;
}

/**
 * The concrete builder classes will follow the builder interface provided and give specific
 * implementations of methods provided. You may have many builders implemented differently.
 */
class ConcreteBuilder1 implements Builder{
    private product: Product1

    // When a new concrete builder is made we want to start with a fresh product
    constructor() {
        this.reset()
    }

    public reset(): void {
        this.product = new Product1();
    }

    // All the following production methods work with a singular product
    public producePartA(): void {
        this.product.parts.push('PartA');
    }

    public producePartB(): void {
        this.product.parts.push('PartB');
    }

    public producePartZ(): void {
        this.product.parts.push('PartZ');
    }

    /**
     * This is the way to get the product the builder just made and give it a new blank template.
     * Most builders wil return the object their own way so this method is not in the interface.
     * @returns the product you are building
     */
    public getProduct(): Product1 {
        const result = this.product;
        this.reset();
        return result;
    }
}

// Here is another builder that makes a differnt product with the same parts
class ConcreteBuilder2 implements Builder{
    private product: Product2

    // When a new concrete builder is made we want to start with a fresh product
    constructor() {
        this.reset()
    }

    public reset(): void {
        this.product = new Product2();
    }

    // All the following production methods work with a singular product
    public producePartA(num: Number): void {
        this.product.setPartA(num)
    }

    public producePartB(num: Number): void {
        this.product.setPartB(num)
    }

    public producePartZ(num: Number): void {
        this.product.setPartC(num)
    }

    /**
     * This is the way to get the product the builder just made and give it a new blank template.
     * Most builders wil return the object their own way so this method is not in the interface.
     * @returns the product you are building
     */
    public getProduct(): Product2 {
        const result = this.product;
        this.reset();
        return result;
    }
}

/**
 * Use the Builder pattern only when your products are quite complex and require extensive configuration.
 * Note that results of various builders may not always follow the same interface.
 */
class Product1 {
    public parts: string[] = [];

    public listParts(): string {
        return `Product parts: ${this.parts.join(', ')}\n`
    }
}

/**
 * Here product 2 is like product 1 but more customizable, this is to show how different builder interfaces can 
 * be used to create 2 different products. It also goes to show how products can be fully customizable.
 */
class Product2 {
    private numA: Number = 0
    private numB: Number = 0
    private numC: Number = 0

    public setPartA(num: Number) {
        this.numA = num
    }

    public setPartB(num: Number) {
        this.numB = num
    }

    public setPartC(num: Number) {
        this.numC = num
    }

    public listParts(): string {
        return `Product parts: ${this.numA}x PartA, ${this.numB}x PartB, ${this.numC}x PartC\n`
    }
}


/**
 * Here is the dirrector where one can create methods for commonly craeted products. For example,
 * there is the minumum product with just part A and the full product which has all the parts.
 */
class Director {
    private builder: Builder;

    // The director may work with any builder so this is necessary if the client wants to use different builders
    public setBuilder(builder: Builder) {
        this.builder = builder
    }

    public buildMinProduct(): void {
        this.builder.producePartA(1)
    }

    public buildFullProduct(): void {
        this.builder.producePartA(1)
        this.builder.producePartB(1)
        this.builder.producePartZ(1)
    }

    public buildCustomProduct(nums: Number[]): void {
        this.builder.producePartA(nums[0])
        this.builder.producePartB(nums[1])
        this.builder.producePartZ(nums[2])
    }
}

/**
 * The client code takes a directory which is then fed a builder. The final products are 
 * retrieved from the builders. Note that the builder can be used with out a director class.
 */
const client = (director: Director) => {
    const builder1 = new ConcreteBuilder1();
    director.setBuilder(builder1)

    console.log('BUILDING PRODUCT1')
    console.log('Standard Product:')
    director.buildMinProduct()
    console.log(builder1.getProduct().listParts())

    console.log('Full Featured Product:')
    director.buildFullProduct()
    console.log(builder1.getProduct().listParts())

    console.log('Custom Product:')
    builder1.producePartB()
    builder1.producePartZ()
    console.log(builder1.getProduct().listParts())

    const builder2 = new ConcreteBuilder2()

    director.setBuilder(builder2)

    console.log('BUILDING PRODUCT2')
    console.log('Standard Product:')
    director.buildMinProduct()
    console.log(builder2.getProduct().listParts())

    console.log('Full Featured Product:')
    director.buildFullProduct()
    console.log(builder2.getProduct().listParts())

    console.log('Custom Product:')
    director.buildCustomProduct([4,8,5])
    console.log(builder2.getProduct().listParts())

    console.log('Another Custom Product:')
    builder2.producePartA(5)
    builder2.producePartZ(9)
    console.log(builder2.getProduct().listParts())
}

client(new Director())
/**
 * OUTPUT:
 * BUILDING PRODUCT1
 * Standard Product:
 * Product parts: PartA
 * 
 * Full Featured Product:
 * Product parts: PartA, PartB, PartZ
 * 
 * Custom Product:
 * Product parts: PartB, PartZ
 * 
 * BUILDING PRODUCT2
 * Standard Product:
 * Product parts: 1x PartA, 0x PartB, 0x PartC
 * 
 * Full Featured Product:
 * Product parts: 1x PartA, 1x PartB, 1x PartC
 * 
 * Custom Product:
 * Product parts: 4x PartA, 8x PartB, 5x PartC
 * 
 * Another Custom Product:
 * Product parts: 5x PartA, 0x PartB, 9x PartC
 */