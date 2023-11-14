// Iterator interface
interface Iterator<T> {
    next(): T | null;
    hasNext(): boolean;
}

// Tree node
class TreeNode {
    public value: number;
    public children: TreeNode[];

    constructor(value: number) {
        this.value = value;
        this.children = [];
    }
}

// Concrete Iterator
class DepthFirstIterator implements Iterator<TreeNode> {
    private stack: TreeNode[];

    constructor(root: TreeNode) {
        this.stack = [root];
    }

    public next(): TreeNode | null {
        if (!this.hasNext()) {
            return null;
        }

        const current = this.stack.pop()!;
        this.stack.push(...current.children.reverse());
        return current;
    }

    public hasNext(): boolean {
        return this.stack.length > 0;
    }
}

// Concrete Iterator
class BreadthFirstIterator implements Iterator<TreeNode> {
    private queue: TreeNode[];

    constructor(root: TreeNode) {
        this.queue = [root];
    }

    public next(): TreeNode | null {
        if (!this.hasNext()) {
            return null;
        }

        const current = this.queue.shift()!;
        this.queue.push(...current.children);
        return current;
    }

    public hasNext(): boolean {
        return this.queue.length > 0;
    }
}

// Concrete Collection
class TreeCollection {
    private root: TreeNode;

    constructor(root: TreeNode) {
        this.root = root;
    }

    // Factory method for Breadth-First Iterator
    public createBreadthFirstIterator(): Iterator<TreeNode> {
        return new BreadthFirstIterator(this.root);
    }

    // Factory method for Depth-First Iterator
    public createDepthFirstIterator(): Iterator<TreeNode> {
        return new DepthFirstIterator(this.root);
    }
}

const treeRoot = new TreeNode(1);
const child1 = new TreeNode(2);
const child2 = new TreeNode(3);
const child3 = new TreeNode(4);
treeRoot.children = [child1, child2];
child1.children = [child3];

const tree = new TreeCollection(treeRoot);

console.log("Tree:")
const text_tree = `   1   \n  /  \\ \n 2    3 \n  \\ \n   4 `
console.log(text_tree)

console.log("\nBreadth-First Traversal:");
const bfsIterator = tree.createBreadthFirstIterator();
while (bfsIterator.hasNext()) {
    console.log(bfsIterator.next()!.value);
}

console.log("\nDepth-First Traversal:");
const dfsIterator = tree.createDepthFirstIterator();
while (dfsIterator.hasNext()) {
    console.log(dfsIterator.next()!.value);
}


/* OUTPUT
Tree:
   1   
  /  \ 
 2    3 
  \ 
   4 

Breadth-First Traversal:
1
2
3
4

Depth-First Traversal:
1
2
4
3

*/