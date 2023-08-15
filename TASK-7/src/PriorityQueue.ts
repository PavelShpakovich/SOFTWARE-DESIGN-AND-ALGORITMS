interface PriorityQueueI<T> {
  enqueue(value: T, priority: number): void;
  dequeue(): T | undefined;
  size(): number;
}

export class PriorityQueue<T> implements PriorityQueueI<T> {
  private values: { value: T; priority: number }[] = [null];
  private _size: number = 0;

  swap(index1: number, index2: number): void {
    [this.values[index1], this.values[index2]] = [this.values[index2], this.values[index1]];
  }

  size(): number {
    return this._size;
  }

  enqueue = (value: T, priority: number): void => {
    this.values.push({ value, priority });
    ++this._size;

    if (this.size() > 2) {
      let currentIndex = this.size();
      let parentIndex = Math.floor(currentIndex / 2);

      while (parentIndex >= 1 && this.values[currentIndex].priority < this.values[parentIndex].priority) {
        this.swap(currentIndex, parentIndex);
        currentIndex = parentIndex;
        parentIndex = Math.floor(currentIndex / 2);
      }
    }
  };

  dequeue = (): T => {
    if (!this.size()) return;

    this.swap(1, this.size());
    const { value } = this.values.pop();
    --this._size;

    if (this.size() > 2) {
      let currentIndex = 1;
      const getLeftIndex = (i: number): number => 2 * i;
      const getRightIndex = (i: number): number => 2 * i + 1;
      const getLowest = (i: number): number => {
        const leftIndex = getLeftIndex(i);
        const rightIndex = getRightIndex(i);

        if (rightIndex < this.size() && this.values[rightIndex].priority < this.values[leftIndex].priority) {
          return rightIndex;
        }
        return leftIndex;
      };

      while (
        getLeftIndex(currentIndex) < this.size() &&
        this.values[currentIndex].priority >= this.values[getLowest(currentIndex)].priority
      ) {
        const lowestChild = getLowest(currentIndex);
        this.swap(currentIndex, lowestChild);
        currentIndex = lowestChild;
      }
    }

    return value;
  };
}
