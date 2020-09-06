export default class Node<K, V> {
  key: any;
  value: any;
  prev: Node<K, V>;
  next: Node<K, V>;
  constructor(key?: any, value?: any, prev?: Node<K, V>, next?: Node<K, V>) {
    this.key = key;
    this.value = value;
    this.prev = prev;
    this.next = next;
  }
}
