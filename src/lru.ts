export class Node {
  constructor<K, V>(key?: K, value?: V, prev?: Node, next?: Node) {
    this.key = key;
    this.value = value;
    this.prev = prev;
    this.next = next;
  }
}

export class LRU {
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

  peek(key) {
    if (this.nodes[key]) {
      return this.nodes[key].value;
    }
    return undefined;
  }

  set(key, value) {
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

  get(key) {
    if (!this.nodes[key]) {
      return undefined;
    }
    const result = this.nodes[key];
    this.moveToHead(result);
    return result.value;
  }

  moveToHead(node) {
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

  removeFromTail() {
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

export default function createLRUCache(capacity) {
  const lru = new LRU(capacity);
  const cache = lru.nodes;
  const handler = {
    get: function (target, prop) {
      return lru.get(prop);
    },
    set: function (target, prop, value) {
      lru.set(prop, value);
      return true;
    },
  };
  return new Proxy(cache, handler);
}
