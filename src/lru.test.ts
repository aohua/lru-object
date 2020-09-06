import createLRUCache, { Node, LRU } from "./lru";

test("prev and next is not set", () => {
  const node = new Node();
  expect(node.prev).toBe(null);
  expect(node.next).toBe(null);
});

describe("LRU", () => {
  test("first element should be removed", () => {
    const lru = new LRU(3);
    lru.set(1, 1);
    lru.set(2, 2);
    lru.set(3, 3);
    expect(lru.peek(1)).toBe(1);
    lru.set(4, 4);
    expect(lru.get(1)).toBe(undefined);
    expect(lru.get(2)).toBe(2);
    lru.set(5, 5);
    expect(lru.get(3)).toBe(undefined);
  });
});

describe("LRU cache", () => {
  test("first element should be removed", () => {
    const lru = createLRUCache(3);
    lru[1] = 1;
    lru[2] = 2;
    lru[3] = 3;
    expect(lru[1]).toBe(1);
    lru[4] = 4;
    console.log({ ...lru });
    expect(lru[2]).toBe(undefined);
  });
});
