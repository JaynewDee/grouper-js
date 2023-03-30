export interface StudentType {
  name: string;
  avg: number;
  group: string;
}

export const Student = (
  name: string,
  avg: number,
  group: string
): StudentType => ({
  name,
  avg,
  group: String(group)
});

export class JobDeque<T> {
  private head: DequeNode<T> | null;
  private tail: DequeNode<T> | null;
  private length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  pushFront(value: T) {
    const newNode = new DequeNode<T>(value);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }

    this.length++;
  }

  pushBack(value: T) {
    const newNode = new DequeNode<T>(value);

    if (this.tail === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++;
  }

  popFront(): T | undefined {
    if (this.head === null) {
      return undefined;
    }

    const value = this.head.value;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head!.prev = null;
    }

    this.length--;
    return value;
  }

  popBack(): T | undefined {
    if (this.tail === null) {
      return undefined;
    }

    const value = this.tail.value;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail!.next = null;
    }

    this.length--;
    return value;
  }

  size(): number {
    return this.length;
  }

  isEmpty(): boolean {
    return this.length === 0;
  }
}

class DequeNode<T> {
  public value: T;
  public prev: DequeNode<T> | null;
  public next: DequeNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}
