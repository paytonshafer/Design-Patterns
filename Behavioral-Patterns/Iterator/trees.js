// Tree node
var TreeNode = /** @class */ (function () {
    function TreeNode(value) {
        this.value = value;
        this.children = [];
    }
    return TreeNode;
}());
// Concrete Iterator
var DepthFirstIterator = /** @class */ (function () {
    function DepthFirstIterator(root) {
        this.stack = [root];
    }
    DepthFirstIterator.prototype.next = function () {
        var _a;
        if (!this.hasNext()) {
            return null;
        }
        var current = this.stack.pop();
        (_a = this.stack).push.apply(_a, current.children.reverse());
        return current;
    };
    DepthFirstIterator.prototype.hasNext = function () {
        return this.stack.length > 0;
    };
    return DepthFirstIterator;
}());
// Concrete Iterator
var BreadthFirstIterator = /** @class */ (function () {
    function BreadthFirstIterator(root) {
        this.queue = [root];
    }
    BreadthFirstIterator.prototype.next = function () {
        var _a;
        if (!this.hasNext()) {
            return null;
        }
        var current = this.queue.shift();
        (_a = this.queue).push.apply(_a, current.children);
        return current;
    };
    BreadthFirstIterator.prototype.hasNext = function () {
        return this.queue.length > 0;
    };
    return BreadthFirstIterator;
}());
// Concrete Collection
var TreeCollection = /** @class */ (function () {
    function TreeCollection(root) {
        this.root = root;
    }
    // Factory method for Breadth-First Iterator
    TreeCollection.prototype.createBreadthFirstIterator = function () {
        return new BreadthFirstIterator(this.root);
    };
    // Factory method for Depth-First Iterator
    TreeCollection.prototype.createDepthFirstIterator = function () {
        return new DepthFirstIterator(this.root);
    };
    return TreeCollection;
}());
var treeRoot = new TreeNode(1);
var child1 = new TreeNode(2);
var child2 = new TreeNode(3);
var child3 = new TreeNode(4);
treeRoot.children = [child1, child2];
child1.children = [child3];
var tree = new TreeCollection(treeRoot);
console.log("Tree:");
var text_tree = "   1   \n  /  \\ \n 2    3 \n  \\ \n   4 ";
console.log(text_tree);
console.log("\nBreadth-First Traversal:");
var bfsIterator = tree.createBreadthFirstIterator();
while (bfsIterator.hasNext()) {
    console.log(bfsIterator.next().value);
}
console.log("\nDepth-First Traversal:");
var dfsIterator = tree.createDepthFirstIterator();
while (dfsIterator.hasNext()) {
    console.log(dfsIterator.next().value);
}
/* OUTPUT
Tree:
   1
  /  \
 2    3
  \
   4

Depth-First Traversal:
1
2
4
3

Breadth-First Traversal:
1
2
3
4

*/ 
