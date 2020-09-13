import Node from "./node";
import DoublyLinkedList from "./doublyLinkedList";

interface Iterator<K, V> {
  next(value?: any): IteratorResult<K, V>;
  return?(value?: any): IteratorResult<K, V>;
  throw?(e?: any): IteratorResult<K, V>;
}

interface IteratorResult<K, V> {
  done: boolean;
  value: [K, V];
}

export default class LRU<K, V> {
  nodes:
    | { [key: string]: V }
    | { [key: number]: V }
    | { [Symbol.iterator]: () => Iterator<K, V> };
  list: DoublyLinkedList<K, V>;
  capacity: number;
  constructor(capacity: number) {
    this.list = new DoublyLinkedList();
    this.nodes = {};
    this.capacity = capacity;
  }

  peek(key: string | number): V | undefined {
    if (this.nodes[key]) {
      return this.nodes[key].value;
    }
    return undefined;
  }

  set(key: string | number, value: V): true {
    if (this.nodes[key]) {
      const node = this.nodes[key];
      node.value = value;
      this.moveToHead(node);
      return true;
    }
    if (this.list.size === this.capacity) {
      this.removeFromTail();
    }
    const newNode = new Node(key, value);
    this.list.add(newNode);
    this.nodes[key] = newNode;
    return true;
  }

  get(key: string | number): V | undefined {
    if (!this.nodes[key]) {
      return undefined;
    }
    const result = this.nodes[key];
    if (this.nodes.hasOwnProperty(key)) {
      this.moveToHead(result);
      return result.value;
    } else {
      return result;
    }
  }

  has(key): boolean {
    if (!this.nodes[key] || this.list.size === 0) {
      return false;
    }
    let node = this.list.head.next;
    while (node) {
      if (node.key === key && node.next) {
        return true;
      }
      node = node.next;
    }
    return false;
  }

  keys(): string[] | number[] {
    const keys = [];
    let node = this.list.head.next;
    while (node) {
      if (node.next) {
        keys.push(node.key);
      }
      node = node.next;
    }
    return keys;
  }

  delete(key: string | number): true {
    if (!this.nodes[key]) {
      return true;
    }
    const node = this.nodes[key];
    this.list.remove(node);
    delete this.nodes[key];
    return true;
  }

  private moveToHead(node: Node<K, V>): void {
    if (node.prev.prev === null) {
      return;
    }
    this.list.remove(node);
    this.list.add(node);
  }

  private removeFromTail(): void {
    const toBeRemoved = this.list.tail.prev;
    if (toBeRemoved.prev) {
      this.delete(toBeRemoved.key);
    }
  }
}
