import LRU from "./lru";

export default function createLRUCache<K, V>(
  capacity: number
): { [key: string]: V } | { [key: number]: V } {
  const lru = new LRU<K, V>(capacity);
  const cache = lru.nodes;
  const handler = {
    get(_: any, prop: string | number): V | undefined {
      return lru.get(prop);
    },
    set(_: any, prop: string | number, value: V): true {
      return lru.set(prop, value);
    },
    deleteProperty(_: any, prop: string | number): true {
      return lru.delete(prop);
    },
  };
  return new Proxy(cache, handler);
}
