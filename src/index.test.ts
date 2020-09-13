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
  test("update will shift the element to head", () => {
    const lru = createLRUCache<number, number>(3);
    lru[1] = 1;
    lru[2] = 2;
    lru[3] = 3;
    lru[4] = 4;
    lru[2] = lru[4];
    lru[5] = 5;
    expect(lru[3]).toBe(undefined);
  });
  test("delete node", () => {
    const lru = createLRUCache<number, number>(3);
    lru[1] = 1;
    lru[2] = 2;
    lru[3] = 3;
    delete lru[3];
    lru[4] = 4;
    expect(lru[3]).toBe(undefined);
    expect(lru[4]).toBe(4);
    delete lru[4];
    expect(lru[4]).toBe(undefined);
    expect(lru[1]).toBe(1);
    expect(lru[2]).toBe(2);
  });
  test("keys should be empty array", () => {
    const lru = createLRUCache<number, number>(3);
    expect(Object.keys(lru)).toStrictEqual([]);
  });
  test("keys should follow the sequence", () => {
    const lru = createLRUCache<number, number>(3);
    lru[1] = 1;
    lru[2] = 2;
    lru[3] = 3;
    expect(lru[1]).toBe(1);
    lru[4] = 4;
    expect(Object.keys(lru)).toStrictEqual(["4", "1", "3"]);
  });
  test("for...of loop should work like normal", () => {
    const lru = createLRUCache<number, number>(3);
    lru[1] = 1;
    lru[2] = 2;
    lru[3] = 3;
    expect(lru[1]).toBe(1);
    lru[4] = 4;
    expect(Object.keys(lru)).toStrictEqual(["4", "1", "3"]);
    const keys = [];
    const values = [];
    for (const [k, v] of Object.entries(lru)) {
      keys.push(k);
      values.push(v);
    }
    expect(keys).toStrictEqual(["4", "1", "3"]);
    expect(values).toStrictEqual([4, 1, 3]);
  });
  test("for...in loop should work like normal", () => {
    const lru = createLRUCache<number, number>(3);
    lru[1] = 1;
    lru[2] = 2;
    lru[3] = 3;
    expect(lru[1]).toBe(1);
    lru[4] = 4;
    const keys = [];
    for (const key in lru) {
      if (lru.hasOwnProperty(key)) {
        keys.push(key);
      }
    }
    expect(keys).toStrictEqual(["4", "1", "3"]);
  });
});
