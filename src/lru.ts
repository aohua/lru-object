export class Node<K,V> {
  key: any
  value: any
  prev: Node<K, V>
  next: Node<K, V>
  constructor(key?: any, value?: any, prev?: Node<K, V>, next?: Node<K, V>) {
    this.key = key;
    this.value = value;
    this.prev = prev;
    this.next = next;
  }
}

export class LRU<K, V> {
  head: Node<K, V>
  tail: Node<K, V>
  nodes: {[key: string]: V} | {[key: number]: V}
  size: number
  capacity: number
  constructor(capacity: number) {
    this.head = new Node();
    this.tail = new Node();
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.nodes = {};
    this.size = 0;
    this.capacity = capacity;
    if (capacity <= 0) {
      console.error("LRU capacity must be gratter than 0");
    }
  }

  peek(key: string | number): V | undefined {
    if (this.nodes[key]) {
      return this.nodes[key].value;
    }
    return undefined;
  }

  set(key: string | number, value: V): void {
    if (this.nodes[key]) {
      const node = this.nodes[key];
      node.value = value;
      return;
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
  }

  get(key: string | number): V | undefined {
    if (!this.nodes[key]) {
      return undefined;
    }
    const result = this.nodes[key];
    this.moveToHead(result);
    return result.value;
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
  }

  private removeFromTail(): void {
    const toBeRemoved = this.tail.prev;
    const prev = toBeRemoved.prev;
    prev.next = this.tail;
    this.tail.prev = prev;
    toBeRemoved.prev = null;
    toBeRemoved.next = null;
    delete this.nodes[toBeRemoved.key];
    this.size--;
  }
}

export default function createLRUCache<K, V>(capacity: number): {[key: string]: V} | {[key: number]: V} {
  const lru = new LRU<K, V>(capacity);
  const cache = lru.nodes;
  const handler = {
    get: function (_, prop): V | undefined {
      return lru.get(prop);
    },
    set: function (_, prop, value): boolean {
      lru.set(prop, value);
      return true;
    },
  };
  return new Proxy(cache, handler);
}
