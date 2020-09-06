# lru-object

Javascript object with basic LRU functionalities, the idea of this small library is to use the [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) API to create a Javascript Object with LRU behaviors without loosing the Syntactic Sugar of Object(e.g. spread and rest operations).

[<img src="https://img.shields.io/travis/AOHUA/lru-object.svg">](https://travis-ci.org/AOHUA/lru-object)

### How to use

Create the state sync middleware with config:

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
lru[2] = lru[4];
lru[5] = 5;
// lru[3] is removed, current object { '2': 4, '4': 4, '5': 5 };
```
