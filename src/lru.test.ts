import LRU from "./lru";

describe("LRU", () => {
  test("first element should be removed", () => {
    const lru = new LRU<number, number>(3);
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
