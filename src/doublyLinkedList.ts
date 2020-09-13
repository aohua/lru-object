import Node from "./node";

export default class DoublyLinkedList<K, V> {
  head: Node<K, V>;
  tail: Node<K, V>;
  size: number;
  constructor() {
    this.head = new Node();
    this.tail = new Node();
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.size = 0;
  }
  add(node) {
    const next = this.head.next;
    this.head.next = node;
    next.prev = node;
    node.prev = this.head;
    node.next = next;
    this.size++;
    return node;
  }
  remove(node) {
    if (!node || node === this.head || node === this.tail) {
      return null;
    }
    const prev = node.prev;
    const next = node.next;
    prev.next = next;
    next.prev = prev;
    this.size--;
    return node;
  }
}
