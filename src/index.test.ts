import createLRUCache from "./index";

describe("LRU cache", () => {
  test("first element should be removed", () => {
    const lru = createLRUCache<number, number>(3);
    lru[1] = 1;
    lru[2] = 2;
    lru[3] = 3;
    expect(lru[1]).toBe(1);
    lru[4] = 4;
    expect(lru[2]).toBe(undefined);
  });
  test("Update will shift the element to head", () => {
    const lru = createLRUCache<number, number>(3);
    lru[1] = 1;
    lru[2] = 2;
    lru[3] = 3;
    lru[4] = 4;
    lru[2] = lru[4];
    lru[5] = 5;
    expect(lru[3]).toBe(undefined);
  });
});
