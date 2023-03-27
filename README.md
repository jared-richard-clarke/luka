# Luka

A JavaScript module providing functional replacements for a handful of
arithmetic operations.

## Examples

```javascript
import op from "./luka.js";

// Unary Operations
const negation         = op.neg(7) // ----------->   -7

// Binary Operations
const addition         = op.add(1, 6) // -------->    7
const subtraction      = op.sub(8, 1) // -------->    7
const multiplication   = op.mul(2, 7) // -------->   14
const division         = op.div(14, 2) // ------->    7
const exponent         = op.pow(2, 7) // -------->  128
const remainder        = op.rem(15, 7) // ------->    1
const equal            = op.equal(7, 7) // ------> true

// Folding Operations
const sum              = op.sum(1, 2, 3) // ----->    6
const sum_identity     = op.sum() // ------------>    0
const product          = op.product(2, 2, 2) // ->    8
const product_identity = op.product() // -------->    1
```

## API

| operation         | `luka.js`               |
| ----------------- | ----------------------- |
| `-x`              | `neg(x)`                |
| `x + y`           | `add(x, y)`             |
| `x - y`           | `sub(x, y)`             |
| `x * y`           | `mul(x, y)`             |
| `x / y`           | `div(x, y)`             |
| `x ** y`          | `pow(x, y)`             |
| `x % y`           | `rem(x, y)`             |
| `x === y`         | `equal(x, y)`           |
| `x + y + z + ...` | `sum(x, y, z, ...)`     |
| `x * y * z * ...` | `product(x, y, z, ...)` |
