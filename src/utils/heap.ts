export type Comparator<T> = (a: T, b: T) => number

export const minHeapComparator = <T>(a: T, b: T): number => {
    return a < b ? -1 : a > b ? 1 : 0;
};

export const maxHeapComparator = <T>(a: T, b: T): number => {
    return a > b ? -1 : a < b ? 1 : 0;
};

export class Heap<T = number> {
    private comparator: Comparator<T>
    private heap: T[];
    
    public constructor(comparator: Comparator<T> = minHeapComparator) {
        this.comparator = comparator
        this.heap = [];
    }

    public elements() {
        return this.heap
    }

    public clear() {
        this.heap = [];
    }

    public peek() {
        if(this.heap.length === 0) {
            return null;
        }

        return this.heap[0];
    }

    public remove() {
        if(this.heap.length === 0) {
            return null;
        }

        const item = this.heap[0];

        this.heap[0] = this.heap[this.heap.length - 1];
        this.heap.pop();
        this.heapifyDown();

        return item;
    }

    public add(item: T) {
        this.heap.push(item);
        this.heapifyUp();
    }

    private heapifyUp() {
        let index = this.heap.length - 1;

        while (this.hasParent(index) && this.comparator(this.parent(index), this.heap[index]) > 0) {
            this.swap(this.getParentIndex(index), index);
            index = this.getParentIndex(index);
        }
    }

    private heapifyDown() {
        let index = 0;

        while(this.hasLeftChild(index)) {
            let smallerChildIndex = this.getLeftChildIndex(index);

            if (this.hasRightChild(index) && this.comparator(this.rightChild(index), this.leftChild(index)) < 0) {
                smallerChildIndex = this.getRightChildIndex(index);
            }

            if (this.comparator(this.heap[index], this.heap[smallerChildIndex]) <= 0) {
                break;
            } else {
                this.swap(index, smallerChildIndex);
            }

            index = smallerChildIndex;
        }
    }

    private getLeftChildIndex(parentIndex: number) {
        return 2 * parentIndex + 1;
    }

    private getRightChildIndex(parentIndex: number) {
        return 2 * parentIndex + 2;
    }

    private getParentIndex(childIndex: number) {
        return Math.floor((childIndex - 1) / 2);
    }

    private hasLeftChild(index: number) {
        return this.getLeftChildIndex(index) < this.heap.length;
    }

    private hasRightChild(index: number) {
        return this.getRightChildIndex(index) < this.heap.length;
    }

    private hasParent(index: number) {
        return this.getParentIndex(index) >= 0;
    }

    private leftChild(index: number) {
        return this.heap[this.getLeftChildIndex(index)];
    }

    private rightChild(index: number) {
        return this.heap[this.getRightChildIndex(index)];
    }

    private parent(index: number) {
        return this.heap[this.getParentIndex(index)];
    }

    private swap(indexOne: number, indexTwo: number) {
        const temp = this.heap[indexOne];

        this.heap[indexOne] = this.heap[indexTwo];
        this.heap[indexTwo] = temp;
    }
}
