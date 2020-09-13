# lru-object

Javascript object with basic LRU functionalities, the idea of this small library is to use the [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) API to create a Javascript Object with LRU behaviors without loosing the Syntactic Sugar of Object(e.g. spread and rest operations).

[<img src="https://img.shields.io/travis/AOHUA/lru-object.svg">](https://travis-ci.org/AOHUA/lru-object)

### How to install

Install with npm.

```
npm i --save lru-object
```

Install with yarn

```
yarn add lru-object
```

### Features

1. LRU cache features will be applied invisibly:

```javascript
import createLRUCache from 'lru-object';

const lru = createLRUCache<number, number>(3);

lru[1] = 1;
lru[2] = 2;
lru[3] = 3;
// reached capacity
lru[4] = 4;
console.log({...lru});
// lru[1] is removed, current object { '2': 2, '3': 3, '4': 4 };
```

Please aware that the newly created Object `{...lru}` is nolonger a LRU cache but a plain javascript object.

2. Keys will follow the least recently used sequence

```javascript
import createLRUCache from 'lru-object';

const lru = createLRUCache<number, number>(3);

lru[1] = 1;
lru[2] = 2;
lru[3] = 3;
// reached capacity
lru[4] = 4;
console.log(Object.keys(lru));
// keys will follow the priority: ['4', '3', '2'];
```

3. Use it as normal object

```javascript
import createLRUCache from 'lru-object';

const lru = createLRUCache<number, number>(3);

lru['one'] = 1;
lru['two'] = 2;
lru['three'] = 3;
// reached capacity
delete lru['three']

for(const [k, v] of Object.entries(lru)) {
    console.log(k, v);
}

for (const key in lru) {
    if (lru.hasOwnProperty(key)) {
    console.log(key);
    }
}
```

### Things that are not working as expected

1. Spread operator is not following the least recently used sequence

```javascript
import createLRUCache from 'lru-object';

const lru = createLRUCache<number, number>(3);

lru[1] = 1;
lru[2] = 2;
lru[3] = 3;
console.log({...lru});
// result: { '1': 1, '2': 2, '3': 3 };
// expected: { '3': 3, '2': 2, '1': 1 };
```

### TODO

1. Some options for the LRU cache
2. Fix typescript issues
3. ...
