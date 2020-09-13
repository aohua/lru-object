import Node from "./node";

export default class LRU<K, V> {
  head: Node<K, V>;
  tail: Node<K, V>;
  nodes: { [key: string]: V } | { [key: number]: V };
  size: number;
  capacity: number;
  constructor(capacity: number) {
    this.head = new Node();
    this.tail = new Node();
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.nodes = {};
    this.size = 0;
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
    if (this.size === this.capacity) {
      this.removeFromTail();
    }
    const newNode = new Node(key, value);
    const next = this.head.next;
    this.head.next = newNode;
    next.prev = newNode;
    newNode.prev = this.head;
    newNode.next = next;
    this.nodes[key] = newNode;
    this.size++;
    return true;
  }

  get(key: string | number): V | undefined {
    if (!this.nodes[key]) {
      return undefined;
    }
    const result = this.nodes[key];
    this.moveToHead(result);
    return result.value;
  }

  keys(): string[] | number[] {
    const keys = [];
    let node = this.head.next;
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
    const prev = node.prev;
    const next = node.next;
    prev.next = next;
    next.prev = prev;
    delete this.nodes[key];
    this.size--;
    return true;
  }

  private moveToHead(node: Node<K, V>): void {
    if (node.prev.prev === null) {
      return;
    }
    const prev = node.prev;
    const next = node.next;
    prev.next = next;
    next.prev = prev;
    const headNext = this.head.next;
    this.head.next = node;
    node.prev = this.head;
    node.next = headNext;
    headNext.prev = node;
  }

  private removeFromTail(): void {
    const toBeRemoved = this.tail.prev;
    if (toBeRemoved.prev) {
      this.delete(toBeRemoved.key);
    }
  }
}
