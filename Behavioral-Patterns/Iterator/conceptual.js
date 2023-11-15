/**
 * Example of Concrete Iterators which implement the traversal algorithms.
 * These store the current traversal position always.
 */
var ConcreteIterator = /** @class */ (function () {
    function ConcreteIterator(collection, reverse) {
        if (reverse === void 0) { reverse = false; }
        // Storing current position of traversal (may be other feilds for iteration state, depending on collection type)
        this.position = 0;
        // Variable for traversal direction
        this.reverse = false;
        this.collection = collection;
        this.reverse = reverse;
        if (reverse) {
            this.position = collection.getCount() - 1;
        }
    }
    ConcreteIterator.prototype.rewind = function () {
        this.position = this.reverse ?
            this.collection.getCount() - 1 :
            0;
    };
    ConcreteIterator.prototype.current = function () {
        return this.collection.getItems()[this.position];
    };
    ConcreteIterator.prototype.key = function () {
        return this.position;
    };
    ConcreteIterator.prototype.next = function () {
        var item = this.collection.getItems()[this.position];
        this.position += this.reverse ? -1 : 1;
        return item;
    };
    ConcreteIterator.prototype.valid = function () {
        if (this.reverse) {
            return this.position >= 0;
        }
        return this.position < this.collection.getCount();
    };
    return ConcreteIterator;
}());
// Concrete Collections provide methods for retreiving new iterator instances for said collection.
var WordsCollection = /** @class */ (function () {
    function WordsCollection() {
        this.items = [];
    }
    WordsCollection.prototype.getItems = function () {
        return this.items;
    };
    WordsCollection.prototype.getCount = function () {
        return this.items.length;
    };
    WordsCollection.prototype.addItem = function (item) {
        this.items.push(item);
    };
    WordsCollection.prototype.getIterator = function () {
        return new ConcreteIterator(this);
    };
    WordsCollection.prototype.getReverseIterator = function () {
        return new ConcreteIterator(this, true);
    };
    return WordsCollection;
}());
// Client code
var collection = new WordsCollection();
collection.addItem('First');
collection.addItem('Second');
collection.addItem('Third');
var iterator = collection.getIterator();
console.log('Straight traversal:');
while (iterator.valid()) {
    console.log(iterator.next());
}
console.log('');
console.log('Reverse traversal:');
var reverseIterator = collection.getReverseIterator();
while (reverseIterator.valid()) {
    console.log(reverseIterator.next());
}
